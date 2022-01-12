//#region Imports

import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../../../common/base-crud.service';
import { isValid } from '../../../utils/functions';
import { TaskEntity } from '../../tasks/entities/task.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { TaskGroupEntity } from '../entities/task-group.entity';
import { CreateTaskGroupPayload } from '../models/create-task-group.payload';

//#endregion

@Injectable()
export class TaskGroupService extends BaseCrudService<TaskGroupEntity> {

  constructor(
    @InjectRepository(TaskGroupEntity)
    public repository: Repository<TaskGroupEntity>,
  ) {
    super(repository);
  }

  public async listMany(crudRequest: CrudRequest, requestUser: UserEntity): Promise<GetManyDefaultResponse<TaskGroupEntity> | TaskGroupEntity[]> {
    crudRequest.parsed.filter = [
      { field: 'creatorId', operator: '$eq', value: requestUser.id },
      ...crudRequest.parsed.filter,
    ];

    crudRequest.parsed.search.$and = [
      { isActive: true },
      ...crudRequest.parsed.search.$and,
    ];

    return await this.getMany(crudRequest);
  }

  public async get(id: number, crudRequest: CrudRequest): Promise<TaskGroupEntity> {
    let userTaskEntity: TaskGroupEntity;

    if (crudRequest) {
      crudRequest.parsed.search = { id, ...crudRequest.parsed.search };
      userTaskEntity = await super.getOne(crudRequest);
    } else {
      userTaskEntity = await TaskGroupEntity.findById<TaskGroupEntity>(id);
    }

    if (!userTaskEntity)
      throw new NotFoundException(`A entitidade procurado pela identificação ${ id } não foi encontrada`);

    return userTaskEntity;
  }

  public async create(reqUser: UserEntity, payload: CreateTaskGroupPayload): Promise<TaskGroupEntity> {
    const entity: TaskGroupEntity = this.getEntityFromPayload(payload);

    entity.creatorId = reqUser.id;
    return await entity.save();
  }

  public async update(reqUser: UserEntity, id: number, payload: CreateTaskGroupPayload): Promise<TaskGroupEntity> {
    const entity: TaskGroupEntity = await TaskGroupEntity.findById(id);

    if (!entity)
      throw new NotFoundException(`A entitidade procurado pela identificação ${ id } não foi encontrada`);

    if (entity.creatorId !== reqUser.id )
      throw new ForbiddenException(`Você não tem autorização para alterar a entidade de identificação ${ id }`);

    const updatedEntity = new TaskGroupEntity({
      ...entity,
      ...this.getEntityFromPayload(payload, id),
    });

    return await updatedEntity.save();
  }

  public async delete(id: number, userThatRequested: UserEntity): Promise<TaskGroupEntity> {
    const entity = await TaskGroupEntity.findById<TaskGroupEntity>(id);

    if (!entity || entity.creatorId !== userThatRequested.id)
      throw new NotFoundException(`A entidade procurada pela identificação ${ id } não foi encontrada`);

    entity.isActive = false;

    const tasks = await TaskEntity.find({
      where: {
        groupId: entity.id,
      }
    });

    for (const task of tasks) {
      task.isActive = false
      await task.save();
    }

    return await entity.save();
  }

  //#region Private Methods

  private getEntityFromPayload(payload: CreateTaskGroupPayload, id?: number): TaskGroupEntity {
    return new TaskGroupEntity({
      ...isValid(id) && { id },
      ...isValid(payload.title) && { title: payload.title },
      ...isValid(payload.description) && { description: payload.description },
    });
  }

  //#endregion

}

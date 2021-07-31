//#region Imports

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../../../common/base-crud.service';
import { isValid } from '../../../utils/functions';
import { UserEntity } from '../../users/entities/user.entity';
import { UserTaskEntity } from '../entities/user-task.entity';
import { CreateUserTaskPayload } from '../models/create-user-task.payload';

//#endregion

@Injectable()
export class UserTaskService extends BaseCrudService<UserTaskEntity> {

  constructor(
    @InjectRepository(UserTaskEntity)
    public repository: Repository<UserTaskEntity>,
  ) {
    super(repository);
  }

  public async listMany(crudRequest: CrudRequest): Promise<GetManyDefaultResponse<UserTaskEntity> | UserTaskEntity[]> {
    return await this.getMany(crudRequest);
  }

  public async get(id: number, crudRequest?: CrudRequest): Promise<UserTaskEntity> {
    let userTaskEntity: UserTaskEntity;

    if (crudRequest) {
      crudRequest.parsed.search = { id };
      userTaskEntity = await super.getOne(crudRequest);
    } else {
      userTaskEntity = await UserTaskEntity.findById<UserTaskEntity>(id);
    }

    if (!userTaskEntity)
      throw new NotFoundException(`A entitidade procurado pela identificação ${ id } não foi encontrada`);

    return userTaskEntity;
  }

  public async create(reqUser: UserEntity, payload: CreateUserTaskPayload): Promise<UserTaskEntity> {
    const entity: UserTaskEntity = this.getEntityFromPayload(payload);

    entity.userId = reqUser.id;
    return await entity.save();
  }

  public async update(id: number, payload: CreateUserTaskPayload): Promise<UserTaskEntity> {
    const entity = await UserTaskEntity.findById(id);

    if (!entity)
      throw new NotFoundException(`A entitidade procurado pela identificação ${ id } não foi encontrada`);

    const updatedEntity = new UserTaskEntity({
      ...entity,
      ...this.getEntityFromPayload(payload, id),
    });

    return await updatedEntity.save();
  }

  public async delete(id: number): Promise<UserTaskEntity> {
    const entity = await UserTaskEntity.findById<UserTaskEntity>(id);

    if (!entity)
      throw new NotFoundException(`A entidade procurada pela identificação ${ id } não foi encontrada`);

    entity.isActive = false;

    return await entity.save();
  }

  //#region Private Methods

  private getEntityFromPayload(payload: CreateUserTaskPayload, id?: number): UserTaskEntity {
    return new UserTaskEntity({
      ...isValid(id) && { id },
      ...isValid(payload.taskId) && { taskId: payload.taskId },
    });
  }

  //#endregion

}

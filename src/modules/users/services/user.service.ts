import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../../../common/base-crud.service';
import { isValid } from '../../../utils/functions';
import { UserEntity } from '../entities/user.entity';
import { CreateUserPayload } from '../models/create-user.payload';
import { UserProxy } from '../models/user.proxy';
import { UpdateUserPayload } from '../models/update-user.payload';

@Injectable()
export class UserService extends BaseCrudService<UserEntity> {

  constructor(
    @InjectRepository(UserEntity)
    public repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  /**
   * Retorna todas as tasks
   */
  public async listMany(crudRequest: CrudRequest): Promise<GetManyDefaultResponse<UserEntity> | UserEntity[]> {
    return await this.getMany(crudRequest);
  }

  /**
   * Retorna uma task a partir da identificação
   */
  public async get(id: number, crudRequest?: CrudRequest): Promise<UserEntity> {
    let taskEntity: UserEntity;

    if (crudRequest) {
      crudRequest.parsed.search = { id };
      taskEntity = await super.getOne(crudRequest);
    } else {
      taskEntity = await UserEntity.findById<UserEntity>(id);
    }

    if (!taskEntity)
      throw new NotFoundException(`A entidade de Task procurada pela identificação ${ id } não foi encontrada`);

    return taskEntity;
  }

  /**
   * Cria uma nova entidade de task
   * @param task As informações da task
   */
  public async create(payload: CreateUserPayload): Promise<UserEntity> {
    const taskEntity = this.getEntityFromPayload(payload);

    if (!taskEntity.title)
      throw new BadRequestException(`Não foi enviada um titulo para a tarefa`);

    taskEntity.completed = false;
    return await taskEntity.save();
  }

  /**
   * Atualiza uma entidade de task
   * @param task As informações da task
   */
  public async update(id: number, payload: UpdateUserPayload): Promise<UserEntity> {
    const oldTask = await UserEntity.findById<UserEntity>(id, false);

    const updatedTask = new UserEntity({
      ...oldTask,
      ...this.getEntityFromPayload(payload, id),
    });

    updatedTask.completed = payload.completed;
    updatedTask.isActive = payload.isActive;

    return await updatedTask.save();
  }

  /**
   * Deleta uma entidade de task a partir de sua identificação
   */
  public async delete(id: number): Promise<UserEntity> {
    const taskEntity = await UserEntity.findById<UserEntity>(id, false);

    if (!taskEntity)
      throw new NotFoundException(`A entidade de Task procurada pela identificação ${ id } não foi encontrada`);

    taskEntity.isActive = false;

    return await taskEntity.save();
  }

  //#region Private Methods

  /**
   * Método que retorna a entidade a partir de um payload
   *
   * @param payload As informações do payload
   * @param id A identificação do usuário
   */
  private getEntityFromPayload(payload: CreateUserPayload | UpdateUserPayload, id?: number): UserEntity {
    return new UserEntity({
      ...isValid(id) && { id },
      ...isValid(payload.title) && { title: payload.title },
      ...isValid(payload.description) && { description: payload.description },
    });
  }

  //#endregion

}

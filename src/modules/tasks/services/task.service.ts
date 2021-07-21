import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../../../common/base-crud.service';
import { hasAdminPermission, isValid } from '../../../utils/functions';
import { UserEntity } from '../../users/entities/user.entity';
import { TaskEntity } from '../entities/task.entity';
import { CreateTaskPayload } from '../models/create-task.payload';
import { TaskProxy } from '../models/task.proxy';
import { UpdateTaskPayload } from '../models/update-task.payload';

@Injectable()
export class TaskService extends BaseCrudService<TaskEntity> {

  constructor(
    @InjectRepository(TaskEntity)
    public repository: Repository<TaskEntity>,
  ) {
    super(repository);
  }

  /**
   * Retorna todas as tasks
   */
  public async listMany(crudRequest: CrudRequest, userThatRequested: UserEntity): Promise<GetManyDefaultResponse<TaskEntity> | TaskEntity[]> {
    if (hasAdminPermission(userThatRequested))
      return await this.getMany(crudRequest);

    throw new ForbiddenException('Você não possui permissão para listar todas as tarefas');
  }

  /**
   * Retorna uma task a partir da identificação
   */
  public async get(id: number, crudRequest?: CrudRequest): Promise<TaskEntity> {
    let taskEntity: TaskEntity;

    if (crudRequest) {
      crudRequest.parsed.search = { id };
      taskEntity = await super.getOne(crudRequest);
    } else {
      taskEntity = await TaskEntity.findById<TaskEntity>(id);
    }

    if (!taskEntity)
      throw new NotFoundException(`A entidade de Task procurada pela identificação ${ id } não foi encontrada`);

    return taskEntity;
  }

  /**
   * Cria uma nova entidade de task
   * @param task As informações da task
   */
  public async create(payload: CreateTaskPayload): Promise<TaskEntity> {
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
  public async update(id: number, payload: UpdateTaskPayload): Promise<TaskEntity> {
    const oldTask = await TaskEntity.findById<TaskEntity>(id, false);

    const updatedTask = new TaskEntity({
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
  public async delete(id: number): Promise<TaskEntity> {
    const taskEntity = await TaskEntity.findById<TaskEntity>(id, false);

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
  private getEntityFromPayload(payload: CreateTaskPayload | UpdateTaskPayload, id?: number): TaskEntity {
    return new TaskEntity({
      ...isValid(id) && { id },
      ...isValid(payload.title) && { title: payload.title },
      ...isValid(payload.description) && { description: payload.description },
    });
  }

  //#endregion

}

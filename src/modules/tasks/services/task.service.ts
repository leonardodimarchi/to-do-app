import { ForbiddenException, Injectable } from '@nestjs/common';
import { TaskProxy } from '../models/task.proxy';

@Injectable()
export class TaskService {

  /**
   * Retorna todas as tasks
   */
  public getAll(): TaskProxy[] {
    return [this.getMockedTask()]
  }

  /**
   * Retorna uma task a partir da identificação
   */
  public getById(id: number): TaskProxy {
    return this.getMockedTask();
  }

  /**
   * Cria uma nova entidade de task
   * @param task As informações da task
   */
  public create(task: TaskProxy): TaskProxy {
    return this.getMockedTask();
  }

  /**
   * Atualiza uma entidade de task
   * @param task As informações da task
   */
  public update(task: TaskProxy): TaskProxy {
    return this.getMockedTask();
  }

  /**
   * Deleta uma entidade de task a partir de sua identificação
   */
  public delete(id: number): void {

  }

  public getMockedTask(): TaskProxy {
    return {
      id:0,
      completed: false,
      description: '',
      createdAt: new Date(),
      isActive: true,
      title: '',
      updatedAt: new Date()
    }
  }
}

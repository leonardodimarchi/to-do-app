import { ForbiddenException, Injectable } from '@nestjs/common';
import { Task } from '../models/task';

@Injectable()
export class TaskService {
  tasks: Task[] = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 2, description: 'Task 2', completed: false },
    { id: 3, description: 'Task 3', completed: true },
    { id: 4, description: 'Task 4', completed: false },
  ];

  /**
   * Retorna todas as tasks
   */
  public getAll(): Task[] {
    return this.tasks;
  }

  /**
   * Retorna uma task a partir da identificação
   */
  public getById(id: number): Task {
    const selectedTask = this.tasks.find((task) => task.id === id );

    if (!selectedTask)
      throw new ForbiddenException(`A task com o id: ${id} procurado, não pode ser encontrada`)

    return selectedTask;
  }

  /**
   * Cria uma nova entidade de task
   * @param task As informações da task
   */
  public create(task: Task): Task {
    task.id = this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1;
    this.tasks.push(task);

    return task;
  }

  /**
   * Atualiza uma entidade de task
   * @param task As informações da task
   */
  public update(task: Task): Task {
    const oldTask = this.getById(+task.id);

    if (!oldTask)
      throw new ForbiddenException('A task procurada para atualização não pode ser encontrada')

    oldTask.description = task.description;
    oldTask.completed = task.completed;

    return oldTask;
  }

  /**
   * Deleta uma entidade de task a partir de sua identificação
   */
  public delete(id: number): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    this.tasks.splice(taskIndex, 1);
  }
}

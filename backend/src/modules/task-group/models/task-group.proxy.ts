//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { num } from 'envalid';
import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { GetManyDefaultResponseProxy } from '../../../common/get-many-default-response.proxy';
import { TaskEntity } from '../../tasks/entities/task.entity';
import { TaskProxy } from '../../tasks/models/task.proxy';
import { UserEntity } from '../../users/entities/user.entity';
import { UserProxy } from '../../users/models/user.proxy';
import { TaskGroupEntity } from '../entities/task-group.entity';
import { TaskCount } from './task-count.interface';

//#endregion

/**
 * As informações que a API enviará para o usuario.
 */
export class TaskGroupProxy extends BaseCrudProxy {

  constructor(task: Partial<TaskGroupEntity> | TaskGroupEntity, numberOfTasks?: TaskCount) {
    super(task);

    Object.assign(this, task);

    if (task.tasks)
      this.tasks = task.tasks.map(t => t.toProxy());

    if (task.creator)
      this.creator = task.creator.toProxy();

    if (numberOfTasks) {
      const { taskCount, taskCountCompleted } = numberOfTasks;

      this.taskCount = taskCount;
      this.taskCountCompleted = taskCountCompleted;
    }
  }

  @ApiProperty()
  creatorId: number;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  taskCount: number;

  @ApiProperty()
  taskCountCompleted: number;

  @ApiPropertyOptional({ type: () => UserEntity })
  creator?: UserProxy;

  @ApiPropertyOptional({ type: () => TaskEntity, isArray: true })
  tasks?: TaskProxy[];
}

/**
 * A classe que representa o retorno dos proxies quando é chamado a função GetMany
 */
export class GetManyDefaultResponseTaskGroupProxy extends GetManyDefaultResponseProxy {

  /**
   * A lista de entidades que essa busca retornou
   */
  @ApiProperty({ type: TaskGroupProxy, isArray: true })
  data: TaskGroupProxy[];

}

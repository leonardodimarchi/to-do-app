//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { GetManyDefaultResponseProxy } from '../../../common/get-many-default-response.proxy';
import { TaskEntity } from '../../tasks/entities/task.entity';
import { TaskProxy } from '../../tasks/models/task.proxy';
import { UserEntity } from '../../users/entities/user.entity';
import { UserProxy } from '../../users/models/user.proxy';
import { TaskGroupEntity } from '../entities/task-group.entity';

//#endregion

/**
 * As informações que a API enviará para o usuario.
 */
export class TaskGroupProxy extends BaseCrudProxy {

  constructor(task: Partial<TaskGroupEntity> | TaskGroupEntity) {
    super(task);

    Object.assign(this, task);

    if (task.tasks)
      this.tasks = task.tasks.map(t => t.toProxy());

    if (task.creator)
      this.creator = task.creator.toProxy();
  }

  @ApiProperty()
  creatorId: number;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  description?: string;

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

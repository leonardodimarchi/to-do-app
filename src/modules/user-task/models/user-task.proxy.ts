//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { GetManyDefaultResponseProxy } from '../../../common/get-many-default-response.proxy';
import { TaskEntity } from '../../tasks/entities/task.entity';
import { TaskProxy } from '../../tasks/models/task.proxy';
import { UserEntity } from '../../users/entities/user.entity';
import { UserProxy } from '../../users/models/user.proxy';
import { UserTaskEntity } from '../entities/user-task.entity';

//#endregion

/**
 * As informações que a API enviará para o usuario.
 */
export class UserTaskProxy extends BaseCrudProxy {

  constructor(task: Partial<UserTaskEntity> | UserTaskEntity) {
    super(task);
  }

  @ApiProperty()
  userId: number;

  @ApiProperty()
  taskId: number;

  @ApiPropertyOptional( { type: () => UserProxy } )
  user?: UserProxy;

  @ApiPropertyOptional({ type: () => TaskProxy })
  task?: TaskProxy;
}

/**
 * A classe que representa o retorno dos proxies quando é chamado a função GetMany
 */
export class GetManyDefaultResponseUserTaskProxy extends GetManyDefaultResponseProxy {

  /**
   * A lista de entidades que essa busca retornou
   */
  @ApiProperty({ type: UserTaskProxy, isArray: true })
  data: UserTaskProxy[];

}

//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { GetManyDefaultResponseProxy } from '../../../common/get-many-default-response.proxy';
import { TaskEntity } from '../entities/task.entity';

//#endregion

/**
 * As informações que a API enviará para o usuario.
 */
export class TaskProxy extends BaseCrudProxy {

  constructor(task: Partial<TaskEntity> | TaskEntity) {
    super(task);
    Object.assign(this, task);
  }

  @ApiProperty()
  groupId: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  isDone: boolean;
}

/**
 * A classe que representa o retorno dos proxies quando é chamado a função GetMany
 */
export class GetManyDefaultResponseTaskProxy extends GetManyDefaultResponseProxy {

  /**
   * A lista de entidades que essa busca retornou
   */
  @ApiProperty({ type: TaskProxy, isArray: true })
  data: TaskProxy[];

}

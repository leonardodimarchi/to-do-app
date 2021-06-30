//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseCrudProxy } from '../../common/base-crud.proxy';
import { TaskEntity } from '../entities/task.entity';

//#endregion

/**
 * As informações que a API enviará para o usuario.
 */
export class TaskProxy extends BaseCrudProxy {

  constructor(task: Partial<TaskEntity> | TaskEntity) {
    super(task);
  }

  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  description: string;

  @ApiProperty()
  completed: boolean;
}
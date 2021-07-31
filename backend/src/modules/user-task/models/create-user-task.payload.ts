//#region Imports

import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

//#endregion

/**
 * As informações enviadas para criar uma tarefa do usuario
 */
export class CreateUserTaskPayload {

  @IsDefined()
  @ApiProperty()
  taskId: number;

}

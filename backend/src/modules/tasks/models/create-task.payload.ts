//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * As informações enviadas para criar uma tarefa
 */
export class CreateTaskPayload {

  @ApiProperty()
  @IsDefined({ message: 'É necessário informar o ID do grupo da tarefa' })
  @IsNumber()
  public groupId: number;

  @ApiProperty()
  @IsDefined({ message: 'É necessário informar o conteudo tarefa' })
  @IsString({ message: DefaultValidationMessages.IsString })
  @MaxLength(256, { message: 'O conteudo não pode ter mais que 256 caracteres.' })
  public content: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: DefaultValidationMessages.IsBoolean })
  public isDone?: boolean;
}

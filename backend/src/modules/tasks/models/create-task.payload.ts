//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString, MaxLength } from 'class-validator';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * As informações enviadas para criar uma tarefa
 */
export class CreateTaskPayload {

  /**
   * O titulo da tarefa
   */
  @ApiProperty()
  @IsDefined({ message: 'É necessário informar o titulo da tarefa' })
  @IsString({ message: DefaultValidationMessages.IsString })
  @MaxLength(64, { message: 'O titulo não pode ter mais de 64 caracteres.' })
  public title: string;

  /**
   * A descrição da tarefa
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  @MaxLength(255, { message: 'A descrição não pode ter mais que 255 caracteres.' })
  public description: string;

}
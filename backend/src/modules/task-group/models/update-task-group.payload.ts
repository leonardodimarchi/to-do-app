//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString, MaxLength } from 'class-validator';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * As informações enviadas para atualizar um grupo de tarefas
 */
export class UpdateTaskGroupPayload {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  @MaxLength(256, { message: 'A descrição não pode ter mais que 256 caracteres.' })
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  @MaxLength(256, { message: 'A descrição não pode ter mais que 256 caracteres.' })
  description?: string;
}

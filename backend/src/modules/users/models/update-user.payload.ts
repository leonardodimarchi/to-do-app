//#region Imports

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';
import { BaseCrudUpdatePayload } from '../../../common/base-crud-update.payload';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * As informações enviadas para atualizar um usuario
 */
export class UpdateUserPayload extends BaseCrudUpdatePayload {

  /**
   * Apelido do usuario
   */
  @ApiProperty()
  @IsString({ message: DefaultValidationMessages.IsString })
  @MaxLength(64, { message: 'O apelido não pode ter mais que 64 caracteres.' })
  nickname: string;

  /**
   * Senha do usuario
   */
  @ApiProperty()
  @IsString({ message: DefaultValidationMessages.IsString })
  @MaxLength(256, { message: 'A senha não pode ter mais que 256 caracteres.' })
  password: string;

  /**
   * Primeiro nome do usuario
   */
  @ApiProperty()
  @IsString({ message: DefaultValidationMessages.IsString })
  @MaxLength(256, { message: 'O nome não pode ter mais que 256 caracteres.' })
  firstName: string;

  /**
   * Sobrenome do usuario
   */
  @ApiProperty()
  @IsString({ message: DefaultValidationMessages.IsString })
  @MaxLength(256, { message: 'O sobrenome não pode ter mais que 256 caracteres.' })
  permisions: string;
}

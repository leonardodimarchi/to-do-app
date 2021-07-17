//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * As informações enviadas para criar uma tarefa
 */
export class CreateUserPayload {

  /**
   * Email do usuario
   */
  @ApiProperty()
  @IsString({ message: DefaultValidationMessages.IsString })
  @IsEmail({}, { message: DefaultValidationMessages.IsEmail })
  @MaxLength(255, { message: 'O email não pode ter mais que 255 caracteres.' })
  email: string;

  /**
   * Senha do usuario
   */
  @ApiProperty()
  @IsString({ message: DefaultValidationMessages.IsString })
  @MaxLength(255, { message: 'A senha não pode ter mais que 255 caracteres.' })
  password: string;

  /**
   * Apelido do usuario
   */
  @ApiProperty()
  @IsString({ message: DefaultValidationMessages.IsString })
  @MaxLength(63, { message: 'O apelido não pode ter mais que 63 caracteres.' })
  nickname: string;

  /**
   * Primeiro nome do usuario
   */
  @ApiProperty()
  @IsString({ message: DefaultValidationMessages.IsString })
  @MaxLength(255, { message: 'O nome não pode ter mais que 255 caracteres.' })
  firstName: string;

  /**
   * Sobrenome do usuario
   */
  @ApiProperty()
  @IsString({ message: DefaultValidationMessages.IsString })
  @MaxLength(255, { message: 'O sobrenome não pode ter mais que 255 caracteres.' })
  surName: string;

}

//#region Imports

import { ApiProperty } from '@nestjs/swagger';
import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { GetManyDefaultResponseProxy } from '../../../common/get-many-default-response.proxy';
import { UserEntity } from '../entities/user.entity';

//#endregion

/**
 * As informações que a API enviará para o usuario.
 */
export class UserProxy extends BaseCrudProxy {

  constructor(task: Partial<UserEntity> | UserEntity) {
    super(task);
  }

  /**
   * Apelido do usuario
   */
  @ApiProperty()
  nickname: string;

  /**
   * Senha do usuario
   */
  @ApiProperty()
  password: string;

  /**
   * Primeiro nome do usuario
   */
  @ApiProperty()
  firstName: string;

  /**
   * As permissões do usuario
   */
  @ApiProperty()
  permissions: string;
}

/**
 * A classe que representa o retorno dos proxies quando é chamado a função GetMany
 */
export class GetManyDefaultResponseUserProxy extends GetManyDefaultResponseProxy {

  /**
   * A lista de entidades que essa busca retornou
   */
  @ApiProperty({ type: UserProxy, isArray: true })
  data: UserProxy[];

}

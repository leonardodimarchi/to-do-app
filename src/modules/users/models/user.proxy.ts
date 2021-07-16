//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column } from 'typeorm';
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

  @Column({ nullable: false, length: 64 })
  nickname: string;

  @Column({ nullable: true, length: 256 })
  firstName: string;

  @Column({ nullable: false, length: 256 })
  surName: string;
}

/**
 * A classe que representa o retorno dos proxies quando é chamado a função GetMany
 */
export class GetManyDefaultResponseTaskProxy extends GetManyDefaultResponseProxy {

  /**
   * A lista de entidades que essa busca retornou
   */
  @ApiProperty({ type: UserProxy, isArray: true })
  data: UserProxy[];

}

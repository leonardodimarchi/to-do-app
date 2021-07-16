//#region Imports

import { BaseEntity } from '../../../common/base-entity';
import { Column, Entity } from 'typeorm';
import { UserProxy } from '../models/user.proxy';

//#endregion

/**
 * A entidade das tarefas
 */
@Entity('users')
export class UserEntity extends BaseEntity {
  constructor(partial: Partial<UserEntity>) {
    super();

    Object.assign(this, partial);
  }

  @Column({ nullable: false, length: 64 })
  nickname: string;

  @Column({ nullable: true, length: 256 })
  firstName: string;

  @Column({ nullable: false, length: 256 })
  surName: string;

  //#region Public Methods

  /**
   * Método que retorna um proxy da entidade
   */
  public toProxy(): UserProxy {
    return new UserProxy(this);
  }

  //#endregion
}

//#region Imports

import { NotFoundException } from '@nestjs/common';
import { BaseEntity } from '../../../common/base-entity';
import { Column, Entity } from 'typeorm';
import { getSanitizedEmail } from '../../../utils/functions';
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
  @Column( { nullable: false, length: 256, unique: true })
  email: string;

  @Column({ nullable: false, length: 256 })
  password: string;

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

  /**
   * Método que busca um usuario ativo a a partir do email
   *
   * @param userEmail O e-mail para busca
   */
  public static async getActiveUserByEmail(userEmail: string): Promise<UserEntity | undefined> {
    userEmail = getSanitizedEmail(userEmail);

    const userSearched = await UserEntity.createQueryBuilder('user')
      .where('TRIM(LOWER(user.email)) = :userEmail', { userEmail })
      .getOne();

    if (!userSearched)
      throw new NotFoundException('O usuário com esse email não foi encontrado.');

   if (userSearched.isActive === false)
     throw new NotFoundException('O usuário com esse email foi desativado.');

    return userSearched;
  }

  /**
   * Método que busca um usuario inativo a a partir do email
   *
   * @param userEmail O e-mail para busca
   */
  public static async getNonActiveUserByEmail(userEmail: string): Promise<UserEntity | undefined> {
    userEmail = getSanitizedEmail(userEmail);

    const userSearched = await UserEntity.createQueryBuilder('user')
      .where('TRIM(LOWER(user.email)) = :userEmail', { userEmail })
      .getOne();

    if (!userSearched)
      throw new NotFoundException('O usuário com esse email não foi encontrado.');

    if (userSearched.isActive === true)
      throw new NotFoundException('O usuário com esse email é um usuário ativo.');

    return userSearched;
  }


  /**
   * Diz se já existe um usuario a partir do email passado como parametro
   * @param userEmail O email para busca
   */
  public static async alreadyExistsUserWithTheEmail(userEmail: string): Promise<boolean> {
    userEmail = getSanitizedEmail(userEmail);

    return await UserEntity.createQueryBuilder('user')
      .where('TRIM(LOWER(user.email)) = :userEmail', { userEmail })
      .getCount()
      .then(count => count > 0);
  }

  //#endregion
}

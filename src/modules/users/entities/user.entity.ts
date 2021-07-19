import { NotFoundException } from '@nestjs/common';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base-entity';
import { UsersPermissions } from '../../../models/enums/users-permissions';
import { getSanitizedEmail } from '../../../utils/functions';
import { UserProxy } from '../models/user.proxy';

@Entity('users')
export class UserEntity extends BaseEntity {
  constructor(partial: Partial<UserEntity>) {
    super();

    Object.assign(this, partial);
  }

  @Column({ nullable: false, length: 256, unique: true })
  email: string;

  @Column({ nullable: false, length: 256 })
  password: string;

  @Column({ nullable: false, length: 64 })
  nickname: string;

  @Column({ nullable: true, length: 256 })
  firstName: string;

  @Column({ nullable: false, length: 256 })
  surName: string;

  @Column( { nullable: false, length: 256, default: UsersPermissions.USER })
  permission: string;

  //#region Public Methods

  public toProxy(): UserProxy {
    return new UserProxy(this);
  }

  public static async getActiveUserByEmail(userEmail: string): Promise<UserEntity | undefined> {
    userEmail = getSanitizedEmail(userEmail);

    const userSearched = await this.getUserByEmail(userEmail);

    if (!userSearched)
      throw new NotFoundException('O usuário com esse email não foi encontrado.');

    if (userSearched.isActive === false)
      throw new NotFoundException('O usuário com esse email foi desativado.');

    return userSearched;
  }

  public static async getNonActiveUserByEmail(userEmail: string): Promise<UserEntity | undefined> {
    userEmail = getSanitizedEmail(userEmail);

    const userSearched = await this.getUserByEmail(userEmail);

    if (!userSearched)
      throw new NotFoundException('O usuário com esse email não foi encontrado.');

    if (userSearched.isActive === true)
      throw new NotFoundException('O usuário com esse email é um usuário ativo.');

    return userSearched;
  }

  public static async alreadyExistsUserWithTheEmail(userEmail: string): Promise<boolean> {
    userEmail = getSanitizedEmail(userEmail);

    const userSearched = await UserEntity.createQueryBuilder('user')
      .where('TRIM(LOWER(user.email)) = :userEmail', { userEmail })
      .getOne();

    return !!userSearched;
  }

  //#endregion

  //#region Private Methods

  private static async getUserByEmail(userEmail: string): Promise<UserEntity | undefined> {
    return await UserEntity.createQueryBuilder('user')
      .where('TRIM(LOWER(user.email)) = :userEmail', { userEmail })
      .getOne();
  }

  //#endregion
}

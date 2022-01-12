import { NotFoundException } from '@nestjs/common';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base-entity';
import { getSanitizedNickname } from '../../../utils/functions';
import { UserProxy } from '../models/user.proxy';

@Entity('users')
export class UserEntity extends BaseEntity {
  constructor(partial: Partial<UserEntity>) {
    super();

    Object.assign(this, partial);
  }

  @Column({ nullable: false, unique: true, length: 64 })
  nickname: string;

  @Column({ nullable: false, length: 256 })
  password: string;

  @Column({ nullable: true, length: 256 })
  firstName: string;

  @Column( { nullable: false, length: 256 })
  permissions: string;

  //#region Public Methods

  public toProxy(): UserProxy {
    return new UserProxy(this);
  }

  public static async getActiveUserByNickname(nickname: string): Promise<UserEntity | undefined> {
    nickname = getSanitizedNickname(nickname);

    const userSearched = await this.getUserByNickname(nickname);

    if (!userSearched)
      throw new NotFoundException('O usuário com esse nickname não foi encontrado.');

    if (userSearched.isActive === false)
      throw new NotFoundException('O usuário com esse nickname foi desativado.');

    return userSearched;
  }

  public static async getNonActiveUserByNickname(nickname: string): Promise<UserEntity | undefined> {
    nickname = getSanitizedNickname(nickname);

    const userSearched = await this.getUserByNickname(nickname);

    if (!userSearched)
      throw new NotFoundException('O usuário com esse nickname não foi encontrado.');

    if (userSearched.isActive === true)
      throw new NotFoundException('O usuário com esse nickname é um usuário ativo.');

    return userSearched;
  }

  public static async alreadyExistsUserWithNickname(userNickname: string): Promise<boolean> {
    userNickname = getSanitizedNickname(userNickname);

    const userSearched = await UserEntity.createQueryBuilder('user')
      .where('user.nickname = :userNickname', { userNickname })
      .getOne();

    return !!userSearched;
  }

  //#endregion

  //#region Private Methods

  private static async getUserByNickname(userNickname: string): Promise<UserEntity | undefined> {
    return await UserEntity.createQueryBuilder('user')
      .where('user.nickname = :userNickname', { userNickname })
      .getOne();
  }

  //#endregion
}

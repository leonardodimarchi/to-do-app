//#region Imports

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../../../common/base-crud.service';
import { isValid } from '../../../utils/functions';
import { UserEntity } from '../entities/user.entity';
import { CreateUserPayload } from '../models/create-user.payload';
import { UpdateUserPayload } from '../models/update-user.payload';
import * as bcrypt from 'bcryptjs';

//#endregion

@Injectable()
export class UserService extends BaseCrudService<UserEntity> {

  constructor(
    @InjectRepository(UserEntity)
    public repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  /**
   * Retorna todos os usuarios
   */
  public async listMany(crudRequest: CrudRequest): Promise<GetManyDefaultResponse<UserEntity> | UserEntity[]> {
    return await this.getMany(crudRequest);
  }

  /**
   * Retorna um usuario a partir da identificação
   */
  public async get(id: number, crudRequest?: CrudRequest): Promise<UserEntity> {
    let userEntity: UserEntity;

    if (crudRequest) {
      crudRequest.parsed.search = { id };
      userEntity = await super.getOne(crudRequest);
    } else {
      userEntity = await UserEntity.findById<UserEntity>(id);
    }

    if (!userEntity)
      throw new NotFoundException(`O usuário procurado pela identificação ${ id } não foi encontrada`);

    return userEntity;
  }

  /**
   * Cria um novo usuario
   * @param payload As informações do usuario
   */
  public async create(payload: CreateUserPayload): Promise<UserEntity> {
    const userEntity = this.getEntityFromPayload(payload);

    if (await UserEntity.alreadyExistsUserWithTheEmail(userEntity.email))
      throw new BadRequestException('Já existe um usuário com este email');

    if (!payload.password)
      throw new BadRequestException(`Não foi enviado uma senha para o usuário`);

    userEntity.password = await this.bcryptPassword(payload.password);
    return await userEntity.save();
  }

  /**
   * Atualiza um usuário
   * @param payload As informações do usuario
   */
  public async update(id: number, payload: UpdateUserPayload): Promise<UserEntity> {
    const oldUser = await UserEntity.findById<UserEntity>(id, false);

    const updatedUser = new UserEntity({
      ...oldUser,
      ...this.getEntityFromPayload(payload, id),
    });

    return await updatedUser.save();
  }

  /**
   * Deleta uma entidade de task a partir de sua identificação
   */
  public async delete(id: number): Promise<UserEntity> {
    const taskEntity = await UserEntity.findById<UserEntity>(id, false);

    if (!taskEntity)
      throw new NotFoundException(`A entidade de Task procurada pela identificação ${ id } não foi encontrada`);

    taskEntity.isActive = false;

    return await taskEntity.save();
  }

  //#region Private Methods

  /**
   * Método que retorna a entidade a partir de um payload
   *
   * @param payload As informações do payload
   * @param id A identificação do usuário
   */
  private getEntityFromPayload(payload: CreateUserPayload | UpdateUserPayload, id?: number): UserEntity {
    return new UserEntity({
      ...isValid(id) && { id },
      ...isValid(payload.email) && { email: payload.email },
      ...isValid(payload.firstName) && { firstName: payload.firstName },
      ...isValid(payload.surName) && { surName: payload.surName },
      ...isValid(payload.nickname) && { nickname: payload.nickname },
    });
  }

  /**
   * Gera um hash de senha e retorna encriptada
   *
   * @param password A senha a ser limpa
   */
   public async bcryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(password, salt);
  }

  //#endregion

}

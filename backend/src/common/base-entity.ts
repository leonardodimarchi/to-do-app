//#region Imports

import { NotFoundException } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TypeOrmValueTypes } from '../models/enums/typeorm-value-types';
import { BaseEntity as BaseTypeormEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

//#endregion

/**
 * A classe base para entidades
 */
export class BaseEntity extends BaseTypeormEntity {

  /**
   * Identificação
   */
  @ApiPropertyOptional()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Diz quando foi criado essa postagem
   */
  @ApiPropertyOptional()
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Diz quando foi atualizado essa postagem
   */
  @ApiPropertyOptional()
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * Diz se está ativo
   */
  @ApiPropertyOptional()
  @Column({ default: true })
  isActive: boolean;

  //#region Public Static Methods

  /**
   * Método que verifica se uma entidade existe
   *
   * @param entityIds A identificação dos ids
   */
  public static async exists(...entityIds: number[]): Promise<boolean> {
    const cleanedIds = [...new Set(entityIds)];

    return await this.createQueryBuilder()
      .whereInIds(cleanedIds)
      .getCount()
      .then(count => count >= cleanedIds.length);
  }

  /**
   * Método que procura uma entidade pela sua identificação
   *
   * @param entityId A identificação da entidade
   * @param validateIsActive Diz se deve validar se a entidade está ativa
   * @param relations A lista de relações que você pode incluir
   */
  public static async findById<TEntity extends BaseEntity>(entityId: number, validateIsActive: boolean = true, relations?: string[]): Promise<TEntity> {
    const entity = await this.findOne<TEntity>({
      where: {
        id: entityId,
        ...validateIsActive && { isActive: TypeOrmValueTypes.TRUE },
      },
      relations,
    });

    if (!entity)
      throw new NotFoundException(`A entidade procurada pela identificação (${ entityId }) não foi encontrada.`);

    return entity;
  }

  //#endregion

}
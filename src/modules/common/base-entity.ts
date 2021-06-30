//#region Imports

import { ApiPropertyOptional } from '@nestjs/swagger';
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

}
//#region Imports

import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { CrudController } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

//#endregion

/**
 * A classe que representa o controller base para o crud
 */
@UseInterceptors(ClassSerializerInterceptor)
export class BaseCrudController<TEntity, TService extends TypeOrmCrudService<TEntity>> implements CrudController<TEntity> {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    public service: TService,
  ) { }

  //#endregion

  //#region Public Properties

  /**
   * Método que retorna os métodos base do Crud
   */
  get base(): CrudController<TEntity> {
    return this;
  }

  //#endregion

}
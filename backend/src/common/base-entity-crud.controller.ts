//#region Imports

import { BaseCrudController } from './base-crud.controller';
import { BaseCrudService } from './base-crud.service';
import { BaseEntity } from './base-entity';

//#endregion

/**
 * A classe que representa o controller base para o crud
 */
export class BaseEntityCrudController<TEntity extends BaseEntity, TService extends BaseCrudService<TEntity>> extends BaseCrudController<TEntity, TService> {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    service: TService,
  ) {
    super(service);
  }

  //#endregion

}
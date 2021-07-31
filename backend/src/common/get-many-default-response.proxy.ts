//#region Imports

import { ApiProperty } from '@nestjs/swagger';

//#endregion

/**
 * A classe que representa as informações básicas de toda entidade que será enviada para o usuário
 */
export class GetManyDefaultResponseProxy {

  /**
   * A contagem de quantos items veio nessa busca limitado pelo pageCount
   */
  @ApiProperty()
  count: number;

  /**
   * O total de itens que essa busca pode retornar
   */
  @ApiProperty()
  total: number;

  /**
   * A página na qual está essa busca
   */
  @ApiProperty()
  page: number;

  /**
   * A quantidade de itens que deve retornar por página
   */
  @ApiProperty()
  pageCount: number;

}

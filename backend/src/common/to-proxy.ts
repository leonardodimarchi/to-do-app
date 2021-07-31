/**
 * A interface que dita para implementar a entidade para converter para um proxy
 */
export interface ToProxy<TProxy> {

  /**
   * Método que retorna um proxy da entidade
   */
  toProxy(...params: unknown[]): TProxy;

}

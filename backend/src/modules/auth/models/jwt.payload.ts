export interface JwtPayload {

  /**
   * Requisition User id
   */
  id: number;

  /**
   * When it was generated in Unix timestamp
   */
  iat?: number;

  /**
   * When it will expire in Unix timestamp
   */
  exp?: number;
}

import { filterXSS } from "xss";
import { UsersPermissions } from '../models/enums/users-permissions';
import { UserEntity } from '../modules/users/entities/user.entity';

export function hasAdminPermission(user: UserEntity): boolean {
  return user.permissions.split('|').some(permission => permission === UsersPermissions.ADMIN);
}

export function hasUserPermission(user: UserEntity): boolean {
  return user.permissions.split('|').some(permission => permission === UsersPermissions.USER);
}

/**
 * Sanitiza o email, protegendo contra XSS
 */
export function getSanitizedNickname(nickname: string): string {
  return filterXSS(nickname.trim())
}

/**
 * Método que verifica se o valor é nulo ou indefinido
 *
 * @param value O valor a ser verificado
 */
export function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}

/**
 * Método que verifica se o valor enviado é um valor válido ( ou seja, não nulo ou indefinido )
 *
 * @param value O valor a ser verificado
 */
export function isValid(value: any): boolean {
  return !isNullOrUndefined(value);
}

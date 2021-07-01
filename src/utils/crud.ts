//#region Imports

import { GetManyDefaultResponse } from '@nestjsx/crud';

import { ToProxy } from '../common/to-proxy';
import { isValid } from './functions';

//#endregion

/**
 * Método que mapeia as entidades buscadas pelo crud e retorna uma versão com o Proxy do objeto
 *
 * @param data As informações que precisam ser mapeadas
 * @param proxyParams Os parâmetros a mais passados para o proxy
 */
export function mapCrud<E extends ToProxy<ReturnType<E['toProxy']>>>(data: E, ...proxyParams: Parameters<E['toProxy']>): ReturnType<E['toProxy']>;

/**
 * Método que mapeia as entidades buscadas pelo crud e retorna uma versão com o Proxy do objeto
 *
 * @param data As informações que precisam ser mapeadas
 * @param proxyParams Os parâmetros a mais passados para o proxy
 */
export function mapCrud<E extends ToProxy<ReturnType<E['toProxy']>>>(data: E[], ...proxyParams: Parameters<E['toProxy']>): ReturnType<E['toProxy']>[];

/**
 * Método que mapeia as entidades buscadas pelo crud e retorna uma versão com o Proxy do objeto
 *
 * @param data As informações que precisam ser mapeadas
 * @param proxyParams Os parâmetros a mais passados para o proxy
 */
export function mapCrud<E extends ToProxy<ReturnType<E['toProxy']>>>(data: GetManyDefaultResponse<E> | E[], ...proxyParams: Parameters<E['toProxy']>): GetManyDefaultResponse<ReturnType<E['toProxy']>>;

/**
 * Método que mapeia as entidades buscadas pelo crud e retorna uma versão com o Proxy do objeto
 *
 * @param data As informações que precisam ser mapeadas
 * @param proxyParams Os parâmetros a mais passados para o proxy
 */
export function mapCrud<E extends ToProxy<ReturnType<E['toProxy']>>>(data: GetManyDefaultResponse<E> | E[] | E, ...proxyParams: Parameters<E['toProxy']>): GetManyDefaultResponse<ReturnType<E['toProxy']>> | ReturnType<E['toProxy']>[] | ReturnType<E['toProxy']> {
  if (Array.isArray(data))
    return data.map(item => item.toProxy(...proxyParams));

  if (isGetMany(data)) {
    const { data: listEntities } = data;
    const result: GetManyDefaultResponse<ReturnType<E['toProxy']>> = { ...data, data: [] };

    result.data = listEntities.map(item => item.toProxy(...proxyParams));

    return result;
  }

  return data.toProxy(...proxyParams);
}

/**
 * Método que mapeia, se estiverem válidas, as entidades buscadas pelo crud e retorna uma versão com o Proxy do objeto
 *
 * Caso não seja válido, e seja um array, ele retorna um array vázio.
 *
 * Caso não seja válido, e seja um objeto, ele retorna undefined.
 *
 * @param data As informações que precisam ser mapeadas
 * @param proxyParams Os parâmetros passados para o proxy
 */
export function mapCrudIfValid<E extends ToProxy<ReturnType<E['toProxy']>>>(data: E, ...proxyParams: Parameters<E['toProxy']>): ReturnType<E['toProxy']> | undefined;

/**
 * Método que mapeia, se estiverem válidas, as entidades buscadas pelo crud e retorna uma versão com o Proxy do objeto
 *
 * Caso não seja válido, e seja um array, ele retorna um array vázio.
 *
 * Caso não seja válido, e seja um objeto, ele retorna undefined.
 *
 * @param data As informações que precisam ser mapeadas
 * @param isArray Diz se os dados mapeados são um array
 * @param proxyParams Os parâmetros passados para o proxy
 */
export function mapCrudIfValid<E extends ToProxy<ReturnType<E['toProxy']>>>(data: E[], isArray: boolean, ...proxyParams: Parameters<E['toProxy']>): ReturnType<E['toProxy']>[];

/**
 * Método que mapeia, se estiverem válidas, as entidades buscadas pelo crud e retorna uma versão com o Proxy do objeto
 *
 * Caso não seja válido, e seja um array, ele retorna um array vázio.
 *
 * Caso não seja válido, e seja um objeto, ele retorna undefined.
 *
 * @param data As informações que precisam ser mapeadas
 * @param isArrayOrParams Diz se a lista é um array ou representa os restos dos parametros
 * @param proxyParams O resto dos parametros
 */
export function mapCrudIfValid<E extends ToProxy<ReturnType<E['toProxy']>>>(data?: E[] | E, isArrayOrParams?: boolean | Parameters<E['toProxy']>[], ...proxyParams: Parameters<E['toProxy']>): ReturnType<E['toProxy']>[] | ReturnType<E['toProxy']> {
  if (Array.isArray(data))
    return data.map(item => item.toProxy(...(Array.isArray(isArrayOrParams) ? isArrayOrParams : proxyParams)));

  if (isValid(data))
    return data.toProxy(isArrayOrParams, ...proxyParams);

  if (typeof isArrayOrParams === 'boolean' && isArrayOrParams)
    return [];

  return void 0;
}

/**
 * Método que verifica se ele é do tipo GetManyDefaultResponse
 *
 * @param value O valor a ser verificado
 */
export function isGetMany<T>(value: any): value is GetManyDefaultResponse<T> {
  return value.hasOwnProperty('data') && Array.isArray(value.data);
}

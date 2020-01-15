import { generatePath } from 'react-router'

/**
 *
 * @param path
 * @param params
 */
export function generateRoutePath<T extends keyof IRoutePathParams>(path: T, params: IRoutePathParams[T]) {
  return generatePath(path, params)
}

/**
 * Route paths
 */
export enum RoutePath {
  ROOT = '/',

  AUTH_LOGIN = '/login',

  WORD_CARD_DETAILS = '/w/:wordCardUuid',
}

/**
 * Route paths params
 */
export interface IRoutePathParams {
  [RoutePath.ROOT]: {}

  [RoutePath.AUTH_LOGIN]: {}

  [RoutePath.WORD_CARD_DETAILS]: { wordCardUuid: string }
}

/**
 * Route paths params enums
 */

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
  AUTH_LOGIN = '/login',

  STORE_LIST = '/',

  STORE_DETAILS = '/store/:storeUuid',

  USER_LIST = '/users',

  PRODUCT_LIST = '/products',
}

/**
 * Route paths params
 */
export interface IRoutePathParams {
  [RoutePath.STORE_LIST]: {}

  [RoutePath.AUTH_LOGIN]: {}

  [RoutePath.STORE_DETAILS]: { storeUuid: string }

  [RoutePath.USER_LIST]: {}

  [RoutePath.PRODUCT_LIST]: {}
}

/**
 * Route paths params enums
 */

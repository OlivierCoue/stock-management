import { PermissionNames } from '../../../../graphql/schema'

export const defaultRoles: { [key: string]: PermissionNames[] } = {
  user: [PermissionNames.ROLE_READ_OWN, PermissionNames.USER_READ_OWN, PermissionNames.USER_UPDATE_OWN],
  seller: [
    PermissionNames.ROLE_READ_OWN,

    PermissionNames.USER_CREATE_OWN,
    PermissionNames.USER_READ_OWN,
    PermissionNames.USER_UPDATE_OWN,
    PermissionNames.USER_DELETE_OWN,
  ],
  manager: [
    PermissionNames.ROLE_READ_OWN,

    PermissionNames.USER_CREATE_OWN,
    PermissionNames.USER_READ_OWN,
    PermissionNames.USER_UPDATE_OWN,
    PermissionNames.USER_DELETE_OWN,
  ],
  admin: [
    PermissionNames.ROLE_CREATE_ANY,
    PermissionNames.ROLE_READ_ANY,
    PermissionNames.ROLE_UPDATE_ANY,
    PermissionNames.ROLE_DELETE_ANY,

    PermissionNames.USER_CREATE_ANY,
    PermissionNames.USER_READ_ANY,
    PermissionNames.USER_UPDATE_ANY,
    PermissionNames.USER_DELETE_ANY,

    PermissionNames.STORE_CREATE_ANY,
    PermissionNames.STORE_READ_ANY,
    PermissionNames.STORE_UPDATE_ANY,
    PermissionNames.STORE_DELETE_ANY,

    PermissionNames.AISLE_CREATE_ANY,
    PermissionNames.AISLE_READ_ANY,
    PermissionNames.AISLE_UPDATE_ANY,
    PermissionNames.AISLE_DELETE_ANY,

    PermissionNames.STOCK_CREATE_ANY,
    PermissionNames.STOCK_READ_ANY,
    PermissionNames.STOCK_UPDATE_ANY,
    PermissionNames.STOCK_DELETE_ANY,

    PermissionNames.PRODUCT_CREATE_ANY,
    PermissionNames.PRODUCT_READ_ANY,
    PermissionNames.PRODUCT_UPDATE_ANY,
    PermissionNames.PRODUCT_DELETE_ANY,
  ],
}

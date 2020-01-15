import { PermissionNames } from '../../../../graphql/schema'

export const defaultRoles: { [key: string]: PermissionNames[] } = {
  user: [PermissionNames.ROLE_READ_OWN, PermissionNames.USER_READ_OWN, PermissionNames.USER_UPDATE_OWN],
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
  ],
}

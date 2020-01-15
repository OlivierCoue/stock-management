import { AuthorizationResources, permissionsBuilder } from '../authorization/permission-builder'
import { PermissionNames } from '../../graphql/schema'

permissionsBuilder
  .grant(PermissionNames.USER_CREATE_ANY)
  .createAny(AuthorizationResources.USER)

  .grant(PermissionNames.USER_CREATE_OWN)
  .createOwn(AuthorizationResources.USER)

  .grant(PermissionNames.USER_READ_ANY)
  .readAny(AuthorizationResources.USER)

  .grant(PermissionNames.USER_READ_OWN)
  .readAny(AuthorizationResources.USER)

  .grant(PermissionNames.USER_UPDATE_ANY)
  .updateAny(AuthorizationResources.USER)

  .grant(PermissionNames.USER_UPDATE_OWN)
  .updateOwn(AuthorizationResources.USER)

  .grant(PermissionNames.USER_DELETE_ANY)
  .deleteAny(AuthorizationResources.USER)

  .grant(PermissionNames.USER_DELETE_OWN)
  .deleteOwn(AuthorizationResources.USER)

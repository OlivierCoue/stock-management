import { AuthorizationResources, permissionsBuilder } from '../authorization/permission-builder'
import { PermissionNames } from '../../graphql/schema'

permissionsBuilder
  .grant(PermissionNames.STORE_CREATE_ANY)
  .createAny(AuthorizationResources.STORE)

  .grant(PermissionNames.STORE_CREATE_OWN)
  .createOwn(AuthorizationResources.STORE)

  .grant(PermissionNames.STORE_READ_ANY)
  .readAny(AuthorizationResources.STORE)

  .grant(PermissionNames.STORE_READ_OWN)
  .readAny(AuthorizationResources.STORE)

  .grant(PermissionNames.STORE_UPDATE_ANY)
  .updateAny(AuthorizationResources.STORE)

  .grant(PermissionNames.STORE_UPDATE_OWN)
  .updateOwn(AuthorizationResources.STORE)

  .grant(PermissionNames.STORE_DELETE_ANY)
  .deleteAny(AuthorizationResources.STORE)

  .grant(PermissionNames.STORE_DELETE_OWN)
  .deleteOwn(AuthorizationResources.STORE)

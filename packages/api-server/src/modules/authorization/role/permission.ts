import { AuthorizationResources, permissionsBuilder } from '../permission-builder'
import { PermissionNames } from '../../../graphql/schema'

permissionsBuilder
  .grant(PermissionNames.ROLE_CREATE_ANY)
  .createAny(AuthorizationResources.ROLE)

  .grant(PermissionNames.ROLE_CREATE_OWN)
  .createOwn(AuthorizationResources.ROLE)

  .grant(PermissionNames.ROLE_READ_ANY)
  .readAny(AuthorizationResources.ROLE)

  .grant(PermissionNames.ROLE_READ_OWN)
  .readAny(AuthorizationResources.ROLE)

  .grant(PermissionNames.ROLE_UPDATE_ANY)
  .updateAny(AuthorizationResources.ROLE)

  .grant(PermissionNames.ROLE_UPDATE_OWN)
  .updateOwn(AuthorizationResources.ROLE)

  .grant(PermissionNames.ROLE_DELETE_ANY)
  .deleteAny(AuthorizationResources.ROLE)

  .grant(PermissionNames.ROLE_DELETE_OWN)
  .deleteOwn(AuthorizationResources.ROLE)

import { AuthorizationResources, permissionsBuilder } from '../../authorization/permission-builder'
import { PermissionNames } from '../../../graphql/schema'

permissionsBuilder
  .grant(PermissionNames.AISLE_CREATE_ANY)
  .createAny(AuthorizationResources.AISLE)

  .grant(PermissionNames.AISLE_CREATE_OWN)
  .createOwn(AuthorizationResources.AISLE)

  .grant(PermissionNames.AISLE_READ_ANY)
  .readAny(AuthorizationResources.AISLE)

  .grant(PermissionNames.AISLE_READ_OWN)
  .readAny(AuthorizationResources.AISLE)

  .grant(PermissionNames.AISLE_UPDATE_ANY)
  .updateAny(AuthorizationResources.AISLE)

  .grant(PermissionNames.AISLE_UPDATE_OWN)
  .updateOwn(AuthorizationResources.AISLE)

  .grant(PermissionNames.AISLE_DELETE_ANY)
  .deleteAny(AuthorizationResources.AISLE)

  .grant(PermissionNames.AISLE_DELETE_OWN)
  .deleteOwn(AuthorizationResources.AISLE)

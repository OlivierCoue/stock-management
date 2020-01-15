import { AuthorizationResources, permissionsBuilder } from '../../../authorization/permission-builder'
import { PermissionNames } from '../../../../graphql/schema'

permissionsBuilder
  .grant(PermissionNames.STOCK_CREATE_ANY)
  .createAny(AuthorizationResources.STOCK)

  .grant(PermissionNames.STOCK_CREATE_OWN)
  .createOwn(AuthorizationResources.STOCK)

  .grant(PermissionNames.STOCK_READ_ANY)
  .readAny(AuthorizationResources.STOCK)

  .grant(PermissionNames.STOCK_READ_OWN)
  .readAny(AuthorizationResources.STOCK)

  .grant(PermissionNames.STOCK_UPDATE_ANY)
  .updateAny(AuthorizationResources.STOCK)

  .grant(PermissionNames.STOCK_UPDATE_OWN)
  .updateOwn(AuthorizationResources.STOCK)

  .grant(PermissionNames.STOCK_DELETE_ANY)
  .deleteAny(AuthorizationResources.STOCK)

  .grant(PermissionNames.STOCK_DELETE_OWN)
  .deleteOwn(AuthorizationResources.STOCK)

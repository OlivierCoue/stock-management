import { AuthorizationResources, permissionsBuilder } from '../authorization/permission-builder'
import { PermissionNames } from '../../graphql/schema'

permissionsBuilder
  .grant(PermissionNames.PRODUCT_CREATE_ANY)
  .createAny(AuthorizationResources.PRODUCT)

  .grant(PermissionNames.PRODUCT_CREATE_OWN)
  .createOwn(AuthorizationResources.PRODUCT)

  .grant(PermissionNames.PRODUCT_READ_ANY)
  .readAny(AuthorizationResources.PRODUCT)

  .grant(PermissionNames.PRODUCT_READ_OWN)
  .readAny(AuthorizationResources.PRODUCT)

  .grant(PermissionNames.PRODUCT_UPDATE_ANY)
  .updateAny(AuthorizationResources.PRODUCT)

  .grant(PermissionNames.PRODUCT_UPDATE_OWN)
  .updateOwn(AuthorizationResources.PRODUCT)

  .grant(PermissionNames.PRODUCT_DELETE_ANY)
  .deleteAny(AuthorizationResources.PRODUCT)

  .grant(PermissionNames.PRODUCT_DELETE_OWN)
  .deleteOwn(AuthorizationResources.PRODUCT)

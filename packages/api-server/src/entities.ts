import { SessionEntity } from './modules/session/entity'
import { UserEntity } from './modules/user/entity'
import { RoleEntity } from './modules/authorization/role/entity'
import { PermissionEntity } from './modules/authorization/permission/entity'
import { StoreEntity } from './modules/store/entity'
import { AisleEntity } from './modules/store/aisle/entity'
import { StockEntity } from './modules/store/aisle/stock/entity'
import { ProductEntity } from './modules/product/entity'

export { SessionEntity, UserEntity, RoleEntity, PermissionEntity, StoreEntity, AisleEntity, StockEntity, ProductEntity }

export const entities = [
  SessionEntity,
  UserEntity,
  RoleEntity,
  PermissionEntity,
  StoreEntity,
  AisleEntity,
  StockEntity,
  ProductEntity,
]

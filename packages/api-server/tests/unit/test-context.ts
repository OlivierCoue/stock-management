import { AisleEntity, ProductEntity, StockEntity, StoreEntity, UserEntity } from '../../src/entities'
import { StoreService } from '../../src/modules/store/service'
import { UserService } from '../../src/modules/user/service'
import { AisleService } from '../../src/modules/store/aisle/service'
import { StockService } from '../../src/modules/store/aisle/stock/service'
import { ProductService } from '../../src/modules/product/service'

export interface ITestServices {
  userService: UserService
  storeService: StoreService
  aisleService: AisleService
  productService: ProductService
  stockService: StockService
}

// @ts-ignore
export const testServices: ITestServices = {}

export interface ITestDataContext {
  store0: StoreEntity | undefined
  store1: StoreEntity | undefined

  seller0: UserEntity | undefined
  seller1: UserEntity | undefined
  seller2: UserEntity | undefined

  aisle0: AisleEntity | undefined
  aisle1: AisleEntity | undefined

  product0: ProductEntity | undefined
  product1: ProductEntity | undefined
  product2: ProductEntity | undefined

  stock0: StockEntity | undefined
  stock1: StockEntity | undefined
}

export const testContext: ITestDataContext = {
  store0: undefined,
  store1: undefined,

  seller0: undefined,
  seller1: undefined,
  seller2: undefined,

  aisle0: undefined,
  aisle1: undefined,

  product0: undefined,
  product1: undefined,
  product2: undefined,

  stock0: undefined,
  stock1: undefined,
}

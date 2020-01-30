import { StoreEntity, UserEntity } from '../../src/entities'
import { StoreService } from '../../src/modules/store/service'
import { UserService } from '../../src/modules/user/service'

export interface ITestServices {
  userService: UserService
  storeService: StoreService
}

// @ts-ignore
export const testServices: ITestServices = {}

export interface ITestDataContext {
  store0: StoreEntity | undefined
  store1: StoreEntity | undefined

  seller0: UserEntity | undefined
  seller1: UserEntity | undefined
}

export const testContext: ITestDataContext = {
  store0: undefined,
  store1: undefined,

  seller0: undefined,
  seller1: undefined,
}

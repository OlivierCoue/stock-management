import { StoreEntity } from '../../src/entities'
import { StoreService } from '../../src/modules/store/service'

export interface ITestServices {
  storeService: StoreService
}

// @ts-ignore
export const testServices: ITestServices = {}

export interface ITestDataContext {
  store0: StoreEntity | undefined
  store1: StoreEntity | undefined
  stores: []
}

export const testContext: ITestDataContext = {
  stores: [],
  store0: undefined,
  store1: undefined,
}

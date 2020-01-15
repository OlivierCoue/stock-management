import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common'
import { getConnection } from 'typeorm'

import { RoleService } from '../authorization/role/service'
import { UserService } from '../user/service'
import { StoreEntity } from '../store/entity'
import { StoreService } from '../store/service'
import { AisleService } from '../store/aisle/service'
import { ProductService } from '../product/service'
import { ProductEntity, StockEntity } from '../../entities'
import { StockService } from '../store/aisle/stock/service'

import { users } from './data/users'

interface ICtx {
  stores: StoreEntity[]
  products: ProductEntity[]
}

@Injectable()
export class MockService {
  constructor(
    @Inject(forwardRef(() => RoleService)) private readonly roleService: RoleService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    @Inject(forwardRef(() => StoreService)) private readonly storeService: StoreService,
    @Inject(forwardRef(() => AisleService)) private readonly aisleService: AisleService,
    @Inject(forwardRef(() => StockService)) private readonly stockService: StockService,
    @Inject(forwardRef(() => ProductService)) private readonly productService: ProductService
  ) {}

  async resetDatabase() {
    try {
      const connection = getConnection()
      Logger.log('DATABASE DROPPED')
      await connection.dropDatabase()
      await connection.synchronize()
      Logger.log('SCHEMA CREATED')
      await this.roleService.onModuleInit()
    } catch (err) {
      throw new Error(`ERROR: Cleaning test db: ${err}`)
    }
  }

  async createUsers() {
    await Promise.all(users.map((user) => this.userService.create(user)))
  }

  async createProducts(ctx: ICtx) {
    const productsPromises = []
    for (let i = 0; i < 10; i++) {
      productsPromises.push(this.productService.create({ name: `product-${i}`, price: this.getRandomInt(10, 200) }))
    }
    ctx.products = await Promise.all(productsPromises)
  }

  async createStores(ctx: ICtx) {
    const storesPromises = []
    for (let i = 0; i < 10; i++) {
      storesPromises.push(this.storeService.create({ name: `store-${i}` }))
    }
    ctx.stores = await Promise.all(storesPromises)
  }

  async createAisles(ctx: ICtx) {
    const { stores } = ctx
    const aisleCount = 10

    await Promise.all(
      stores.map(async (store) => {
        const sellersPromises = []
        const aislesPromises = []
        for (let i = 0; i < aisleCount; i++) {
          sellersPromises.push(
            this.userService.create({
              roleName: 'admin',
              password: 'test',
              firstName: 'seller',
              lastName: 'seller',
              email: `seller${i}@${store.name}.com`,
            })
          )
        }
        const sellers = await Promise.all(sellersPromises)

        for (let i = 0; i < aisleCount; i++) {
          aislesPromises.push(
            this.aisleService.create({
              name: `${store.name}-aisle-${i}`,
              storeUuid: store.uuid,
              sellerUuid: sellers[i].uuid,
            })
          )
        }
        await Promise.all(aislesPromises)
      })
    )
  }

  async createStocks(ctx: ICtx) {
    const stores = await this.storeService.findMany({ relations: ['aisles'] })
    const { products } = ctx
    const stocksPromises: Promise<StockEntity>[] = []
    stores.forEach((store) => {
      store.aisles.forEach((aisle) => {
        products.forEach((product) => {
          stocksPromises.push(
            this.stockService.create({
              aisleUuid: aisle.uuid,
              productUuid: product.uuid,
              count: this.getRandomInt(0, 20),
            })
          )
        })
      })
    })
    await Promise.all(stocksPromises)
  }

  getRandomInt(min: number, max: number): number {
    return min + Math.floor(Math.random() * Math.floor(max))
  }

  async createMock() {
    Logger.log('STARTING MOCK')
    const ctx = { stores: [], products: [] }
    await this.resetDatabase()
    await this.createUsers()
    await this.createProducts(ctx)
    await this.createStores(ctx)
    await this.createAisles(ctx)
    await this.createStocks(ctx)
    Logger.log('MOCK FINISHED')
  }
}

import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common'
import { getConnection } from 'typeorm'

import { RoleService } from '../authorization/role/service'
import { UserService } from '../user/service'
import { StoreEntity } from '../store/entity'
import { StoreService } from '../store/service'
import { AisleService } from '../store/aisle/service'

import { users } from './data/users'

interface ICtx {
  stores: StoreEntity[]
}

@Injectable()
export class MockService {
  constructor(
    @Inject(forwardRef(() => RoleService)) private readonly roleService: RoleService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    @Inject(forwardRef(() => StoreService)) private readonly storeService: StoreService,
    @Inject(forwardRef(() => AisleService)) private readonly aisleService: AisleService
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
            this.aisleService.create({ name: `${store.name}-aisle-${i}`, storeUuid: store.uuid, sellerUuid: sellers[i].uuid })
          )
        }
        await Promise.all(aislesPromises)
      })
    )
  }

  async createMock() {
    Logger.log('STARTING MOCK')
    const ctx = { stores: [] }
    await this.resetDatabase()
    await this.createUsers()
    await this.createStores(ctx)
    await this.createAisles(ctx)
    Logger.log('MOCK FINISHED')
  }
}

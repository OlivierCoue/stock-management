import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common'
import { getConnection } from 'typeorm'

import { RoleService } from '../authorization/role/service'
import { UserService } from '../user/service'
import { StoreEntity } from '../store/entity'
import { StoreService } from '../store/service'

import { users } from './data/users'

interface ICtx {
  stores: StoreEntity[]
}

@Injectable()
export class MockService {
  constructor(
    @Inject(forwardRef(() => RoleService)) private readonly roleService: RoleService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    @Inject(forwardRef(() => StoreService)) private readonly storeService: StoreService
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

  async createMock() {
    Logger.log('STARTING MOCK')
    const ctx = { stores: [] }
    await this.resetDatabase()
    await this.createUsers()
    await this.createStores(ctx)
    Logger.log('MOCK FINISHED')
  }
}

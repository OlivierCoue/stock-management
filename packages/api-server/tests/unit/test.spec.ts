import { Test } from '@nestjs/testing'
import { forwardRef, INestApplication } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { AccessControlModule } from 'nest-access-control'

import { env } from '../../src/env'
import { entities } from '../../src/entities'
import { GraphQLOptions } from '../../src/graphql/options'
import { permissionsBuilder } from '../../src/modules/authorization/permission-builder'
import { AuthModule } from '../../src/modules/auth/module'
import { AuthorizationModule } from '../../src/modules/authorization/module'
import { MailerModule } from '../../src/modules/mailer/module'
import { SessionModule } from '../../src/modules/session/module'
import { SystemModule } from '../../src/modules/system/module'
import { UserModule } from '../../src/modules/user/module'
import { StoreModule } from '../../src/modules/store/module'
import { MockModule } from '../../src/modules/mock/module'
import { StoreService } from '../../src/modules/store/service'

import { testServices } from './test-context'

describe('Tests', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        forwardRef(() =>
          TypeOrmModule.forRoot({
            keepConnectionAlive: true,
            type: 'postgres',
            host: env.postgres.host,
            port: env.postgres.port,
            username: env.postgres.username,
            password: env.postgres.password,
            database: env.postgres.database,
            schema: 'public',
            synchronize: true,
            entities,
            logging: env.isDev && ['error'],
            ssl: env.postgres.ssl,
          })
        ),
        forwardRef(() => GraphQLModule.forRoot(GraphQLOptions)),
        forwardRef(() => AccessControlModule.forRoles(permissionsBuilder)),
        forwardRef(() => AuthModule),
        forwardRef(() => AuthorizationModule),
        forwardRef(() => MailerModule),
        forwardRef(() => SessionModule),
        forwardRef(() => SystemModule),
        forwardRef(() => UserModule),
        forwardRef(() => StoreModule),
        forwardRef(() => MockModule),
      ],
    }).compile()

    app = module.createNestApplication()
    await app.init()
    testServices.storeService = app.get<StoreService>(StoreService)
  })

  require('./store')

  afterAll(async () => {
    await app.close()
  })
})

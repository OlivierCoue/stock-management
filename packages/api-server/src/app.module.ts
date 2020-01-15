import { forwardRef, Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { AccessControlModule } from 'nest-access-control'

import { env } from './env'
import { entities } from './entities'
import { GraphQLOptions } from './graphql/options'
import { permissionsBuilder } from './modules/authorization/permission-builder'
import { AuthGuard } from './modules/authorization/guard'
import {
  AuthModule,
  AuthorizationModule,
  MailerModule,
  SessionModule,
  SystemModule,
  UserModule,
  StoreModule,
  MockModule,
} from './modules'
import './permissions'

@Module({
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

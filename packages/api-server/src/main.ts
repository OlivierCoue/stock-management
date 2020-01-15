import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import session from 'express-session'
import passport from 'passport'
import { NestExpressApplication } from '@nestjs/platform-express'

import { env } from './env'
import { AppModule } from './app.module'
import { SessionStore } from './modules/session/store'
import { CustomExceptionFilter } from './exceptions/custom-exception/filter'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.enableCors({ origin: env.client.url, credentials: true })
  app.useGlobalFilters(new CustomExceptionFilter())
  const sessionStoreInstance = app.get(SessionStore)

  sessionStoreInstance.setStore(session)
  app.use(
    session({
      store: sessionStoreInstance,
      name: '@starter/server-web',
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
      cookie: {
        secure: false,
        maxAge: 14 * 24 * 60 * 60 * 1000,
      },
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())
  app.useStaticAssets('local', { prefix: '/static' })
  await app.listen(env.server.port, env.server.host)
}

bootstrap()

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from '../user/module'

import { SessionEntity } from './entity'
import { SessionService } from './service'
import { SessionStore } from './store'

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity]), UserModule],
  providers: [SessionService, SessionStore],
  exports: [],
})
export class SessionModule {}

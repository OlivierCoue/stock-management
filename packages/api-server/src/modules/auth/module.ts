import { forwardRef, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { UserModule } from '../../modules'
import { AuthService } from '../../services'

import { AuthController } from './controller'
import { LocalStrategy } from './local-strategy'
import { PassportSerializer } from './passport-serializer'

@Module({
  controllers: [AuthController],
  imports: [
    forwardRef(() => PassportModule.register({ defaultStrategy: 'local', session: true })),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService, LocalStrategy, PassportSerializer],
})
export class AuthModule {}

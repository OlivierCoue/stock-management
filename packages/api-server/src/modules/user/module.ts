import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthorizationModule, MailerModule } from '../../modules'
import { UserEntity } from '../../entities'
import { UserService } from '../../services'

import { UserResolver } from './resolver'

@Module({
  imports: [
    forwardRef(() => TypeOrmModule.forFeature([UserEntity])),
    forwardRef(() => AuthorizationModule),
    forwardRef(() => MailerModule),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}

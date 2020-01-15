import { forwardRef, Module } from '@nestjs/common'

import { AuthorizationModule } from '../authorization/module'
import { StoreModule } from '../store/module'
import { UserModule } from '../user/module'

import { MockResolver } from './resolver'
import { MockService } from './service'

@Module({
  imports: [forwardRef(() => AuthorizationModule), forwardRef(() => UserModule), forwardRef(() => StoreModule)],
  providers: [MockResolver, MockService],
  exports: [],
})
export class MockModule {}

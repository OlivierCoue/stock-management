import { forwardRef, Module } from '@nestjs/common'

import { AuthorizationModule } from '../authorization/module'
import { StoreModule } from '../store/module'
import { UserModule } from '../user/module'
import { ProductModule } from '../product/module'

import { MockResolver } from './resolver'
import { MockService } from './service'
import { MockController } from './controller'

@Module({
  imports: [
    forwardRef(() => AuthorizationModule),
    forwardRef(() => UserModule),
    forwardRef(() => StoreModule),
    forwardRef(() => ProductModule),
  ],
  providers: [MockResolver, MockService, MockController],
  exports: [],
})
export class MockModule {}

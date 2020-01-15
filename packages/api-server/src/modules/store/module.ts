import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AisleEntity, StockEntity, StoreEntity } from '../../entities'
import { StoreService, AisleService, StockService } from '../../services'
import { ProductModule, UserModule } from '../../modules'

import { StoreResolver } from './resolver'
import { AisleResolver } from './aisle/resolver'
import { StockResolver } from './aisle/stock/resolver'

@Module({
  imports: [
    forwardRef(() => TypeOrmModule.forFeature([StoreEntity, AisleEntity, StockEntity])),
    forwardRef(() => ProductModule),
    forwardRef(() => UserModule),
  ],
  providers: [StoreResolver, StoreService, AisleResolver, AisleService, StockResolver, StockService],
  exports: [StoreService, AisleService, StockService],
})
export class StoreModule {}

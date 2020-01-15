import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductEntity } from '../../entities'
import { ProductService } from '../../services'

import { ProductResolver } from './resolver'

@Module({
  imports: [forwardRef(() => TypeOrmModule.forFeature([ProductEntity]))],
  providers: [ProductResolver, ProductService],
  exports: [ProductService],
})
export class ProductModule {}

import { Column, Entity, ManyToOne } from 'typeorm'
import { CustomBaseEntity } from '@mysg/nest-common'

import { AisleEntity, ProductEntity } from '../../../../entities'

@Entity('stock')
export class StockEntity extends CustomBaseEntity<StockEntity> {
  @Column()
  count: number

  @ManyToOne(() => AisleEntity, (aisle) => aisle.stocks)
  aisle: AisleEntity

  @ManyToOne(() => ProductEntity, (product) => product.usedInStocks)
  product: ProductEntity
}

import { Column, Entity, OneToMany } from 'typeorm'
import { CustomBaseEntity } from '@mysg/nest-common'

import { StockEntity } from '../../entities'

@Entity('product')
export class ProductEntity extends CustomBaseEntity<ProductEntity> {
  @Column()
  name: string

  @Column()
  price: number

  @OneToMany(() => StockEntity, (stock) => stock.product, { persistence: false })
  usedInStocks: StockEntity[]
}

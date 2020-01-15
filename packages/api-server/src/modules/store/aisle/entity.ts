import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { CustomBaseEntity } from '@mysg/nest-common'

import { StockEntity, StoreEntity, UserEntity } from '../../../entities'

@Entity('aisle')
export class AisleEntity extends CustomBaseEntity<AisleEntity> {
  @Column()
  name: string

  @OneToMany(() => UserEntity, (user) => user.sellerInAisle)
  sellers: UserEntity[]

  @ManyToOne(() => StoreEntity, (store) => store.aisles)
  store: StoreEntity

  @OneToMany(() => StockEntity, (stock) => stock.aisle)
  stocks: StockEntity[]
}

import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { CustomBaseEntity } from '@mysg/nest-common'

import { StockEntity, StoreEntity, UserEntity } from '../../../entities'

@Entity('aisle')
export class AisleEntity extends CustomBaseEntity<AisleEntity> {
  @Column()
  name: string

  @OneToOne(() => UserEntity, (user) => user.sellerInAisle)
  @JoinColumn()
  seller: UserEntity

  @ManyToOne(() => StoreEntity, (store) => store.aisles)
  store: StoreEntity

  @OneToMany(() => StockEntity, (stock) => stock.aisle)
  stocks: StockEntity[]
}

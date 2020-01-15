import { Column, Entity, OneToMany } from 'typeorm'
import { CustomBaseEntity } from '@mysg/nest-common'

import { AisleEntity } from '../../entities'

@Entity('store')
export class StoreEntity extends CustomBaseEntity<StoreEntity> {
  @Column()
  name: string

  @OneToMany(() => AisleEntity, (aisle) => aisle.store, { persistence: false })
  aisles: AisleEntity[]
}

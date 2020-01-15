import { Column, Entity, ManyToMany } from 'typeorm'
import { CustomBaseEntity } from '@mysg/nest-common'

import { RoleEntity } from '../../../entities'
import { PermissionNames } from '../../../graphql/schema'

@Entity('permission')
export class PermissionEntity extends CustomBaseEntity<PermissionEntity> {
  @Column({ type: 'enum', enum: PermissionNames, unique: true })
  name!: PermissionNames

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles!: RoleEntity[]
}

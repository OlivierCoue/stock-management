import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import { CustomBaseEntity } from '@mysg/nest-common'

import { PermissionEntity, UserEntity } from '../../../entities'

@Entity('role')
export class RoleEntity extends CustomBaseEntity<RoleEntity> {
  @Column()
  @Index({ unique: true })
  name: string

  @ManyToMany(() => PermissionEntity, (permission) => permission.roles)
  @JoinTable()
  permissions: PermissionEntity[]

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[]

  usersCount: number
}

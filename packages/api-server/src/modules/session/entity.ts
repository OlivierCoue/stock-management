import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'

import { UserEntity } from '../../entities'

@Entity('session')
export class SessionEntity {
  @PrimaryColumn()
  sid!: string

  @Column({ nullable: true })
  expires!: Date

  @Column({ type: 'text', nullable: true })
  data!: string

  @ManyToOne(() => UserEntity, (user) => user.sessions, { onDelete: 'CASCADE' })
  user!: UserEntity

  @Column({ nullable: true })
  lastActivityAt: Date
}

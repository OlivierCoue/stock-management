import { compare, hash } from 'bcryptjs'
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm'
import { IsEmail, ValidateIf } from 'class-validator'
import uuidv4 from 'uuid/v4'
import { CustomBaseEntity } from '@mysg/nest-common'

import { AisleEntity, RoleEntity, SessionEntity } from '../../entities'
import { env } from '../../env'
import { AccountStatus } from '../../graphql/schema'

@Entity('user')
export class UserEntity extends CustomBaseEntity<UserEntity> {
  @Column({ type: 'enum', enum: AccountStatus, default: AccountStatus.PENDING_ACTIVATION })
  status: AccountStatus

  @Column()
  @Index({ unique: true })
  @ValidateIf((o) => o.email)
  @IsEmail()
  email: string

  @Column({ type: 'text', nullable: true })
  activateAccountToken?: string | null

  @Column({ type: 'date', nullable: true })
  activateAccountExpiryDate?: Date | null

  @Column({ default: false })
  emailVerified: boolean

  @Column({ type: 'text', nullable: true })
  verifyEmailToken?: string | null

  @Column({ type: 'date', nullable: true })
  verifyEmailExpiryDate?: Date | null

  @Column({ nullable: true })
  passwordHash: string

  password?: string

  @Column({ type: 'text', nullable: true })
  passwordResetToken?: string | null

  @Column({ type: 'date', nullable: true })
  passwordResetExpiryDate?: Date | null

  @Column()
  firstName: string

  @Column()
  lastName: string

  @ManyToOne(() => AisleEntity, (aisle) => aisle.sellers, { persistence: false })
  sellerInAisle?: AisleEntity

  @OneToMany(() => SessionEntity, (session) => session.user, { persistence: false })
  sessions?: SessionEntity[]

  @ManyToOne(() => RoleEntity, (role) => role.users)
  role: RoleEntity

  // virtual field used for AuthGuard
  roles!: string[]

  generateActivateAccountToken(): void {
    this.activateAccountToken = uuidv4()
    this.activateAccountExpiryDate = new Date(Date.now() + env.userSettings.expiryDelay.passwordReset)
  }

  isActivateAccountTokenValid(): boolean {
    return (this.activateAccountExpiryDate && Date.now() < new Date(this.activateAccountExpiryDate).getTime()) || false
  }

  generateVerifyEmailToken(): void {
    this.verifyEmailToken = uuidv4()
    this.verifyEmailExpiryDate = new Date(Date.now() + env.userSettings.expiryDelay.passwordReset)
  }

  isVerifyEmailTokenValid(): boolean {
    return (this.verifyEmailExpiryDate && Date.now() < new Date(this.verifyEmailExpiryDate).getTime()) || false
  }

  generatePasswordResetToken(): void {
    this.passwordResetToken = uuidv4()
    this.passwordResetExpiryDate = new Date(Date.now() + env.userSettings.expiryDelay.passwordReset)
  }

  isPasswordResetTokenValid(): boolean {
    return (this.passwordResetExpiryDate && Date.now() < new Date(this.passwordResetExpiryDate).getTime()) || false
  }

  setRoles() {
    if (this.role && this.role.permissions) {
      this.roles = this.role.permissions.map((permission) => permission.name)
    }
  }

  protected async beforeInsert(): Promise<void> {
    await super.beforeInsert()
    await this.hashPassword()
  }

  protected async beforeUpdate(): Promise<void> {
    await super.beforeUpdate()
    await this.hashPassword()
  }

  protected async afterLoad(): Promise<void> {
    await super.afterLoad()
    await this.setRoles()
  }

  protected async hashPassword(): Promise<void> {
    if (!this.password) return
    if (!this.passwordHash || !(await compare(this.password, this.passwordHash))) {
      this.passwordHash = await hash(this.password, process.env.APP_ENV === 'live' ? 12 : 1)
    }
  }
}

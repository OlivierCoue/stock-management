import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, QueryRunner, Repository } from 'typeorm'

import {
  AccountStatus,
  UserActivateAccountInput,
  UserDeleteInput,
  UserPasswordResetInput,
  UserUpdateInput,
  UserVerifyEmailInput,
} from '../../graphql/schema'
import { decodeJWT, generateJWT } from '../../common/util/crypto'
import { MailerService } from '../mailer/service'
import { CustomException } from '../../exceptions/custom-exception/exception'
import { UserEntity } from '../../entities'
import { ITypeOrmService } from '../../common/interfaces/typeorm-service'
import { RoleService } from '../authorization/role/service'
import {
  getDefaultServiceOptions,
  IServiceBaseOptions,
  IServiceDeleteOptionsRepo,
  IServiceUpdateOptionsRepo,
} from '../../common/types/service-options'

import { IUserCreateInput, IUserFindManyByPermissionInput } from './types'

@Injectable()
export class UserService implements ITypeOrmService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => MailerService)) private readonly mailerService: MailerService,
    @Inject(forwardRef(() => RoleService)) private readonly roleService: RoleService
  ) {}

  async create(
    createInput: IUserCreateInput,
    options: IServiceBaseOptions = getDefaultServiceOptions()
  ): Promise<UserEntity> {
    const { ...createInputRest } = createInput
    const { email, roleUuid, roleName } = createInputRest
    const { relations, customQueryRunner } = options

    const userRepository = customQueryRunner ? customQueryRunner.manager.getRepository(UserEntity) : this.userRepository

    const role = roleUuid
      ? await this.roleService.findOneOrFail({ where: { uuid: roleUuid } })
      : await this.roleService.findOneOrFail({ where: { name: roleName } })

    const existingUserRecord = await this.findOne({ where: { email } }, customQueryRunner)
    if (existingUserRecord) throw new CustomException('EMAIL_ALREADY_USED')

    const dryUserRecord = new UserEntity({ role, status: AccountStatus.ENABLED, ...createInputRest })

    const { id } = await userRepository.save(dryUserRecord)

    return this.findOneOrFail({ where: { id }, relations }, customQueryRunner)
  }

  findOne(options: FindOneOptions<UserEntity>, customQueryRunner?: QueryRunner): Promise<UserEntity | undefined> {
    const userRepository = customQueryRunner ? customQueryRunner.manager.getRepository(UserEntity) : this.userRepository

    return userRepository.findOne(options)
  }

  async findOneOrFail(options: FindOneOptions<UserEntity>, customQueryRunner?: QueryRunner): Promise<UserEntity> {
    const userRecord = await this.findOne(options, customQueryRunner)
    if (!userRecord) throw new CustomException('USER_NOT_FOUND')

    return userRecord
  }

  findMany(options: FindManyOptions<UserEntity>): Promise<UserEntity[]> {
    return this.userRepository.find(options)
  }

  findManyByPermission(options: IUserFindManyByPermissionInput): Promise<UserEntity[]> {
    const { permissionName, skip, take, qbFindTransformer } = options
    const qb = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.permissions', 'permissions')
      .where('permissions.name = :permissionName', { permissionName })

    if (qbFindTransformer) qbFindTransformer(qb)

    return qb
      .orderBy('user.firstName', 'DESC')
      .skip(skip)
      .take(take)
      .getMany()
  }

  async update(
    updateInput: UserUpdateInput,
    options: IServiceUpdateOptionsRepo<UserEntity> = getDefaultServiceOptions()
  ): Promise<UserEntity> {
    const { uuid, email, roleUuid, ...updateInputRest } = updateInput
    const { relations, repoFindTransformer } = options

    const findOptions = {
      where: { uuid },
      relations: ['role'],
    }
    if (repoFindTransformer) repoFindTransformer(findOptions)

    const userRecord = await this.findOneOrFail(findOptions)
    const { role: roleRecord } = userRecord

    const role = roleUuid ? await this.roleService.findOneOrFail({ where: { uuid: roleUuid } }) : roleRecord

    userRecord.patch({ role, ...updateInputRest })
    await this.userRepository.save(userRecord)

    if (email && email !== userRecord.email) {
      userRecord.email = email
      userRecord.emailVerified = false
      await this.userRepository.save(userRecord)
      await this.sendVerifyEmailToken(userRecord.uuid)
    }

    return this.findOneOrFail({ where: { id: userRecord.id }, relations })
  }

  async delete(deleteInput: UserDeleteInput, options: IServiceDeleteOptionsRepo<UserEntity> = {}): Promise<boolean> {
    const { uuid } = deleteInput

    const { repoFindTransformer } = options

    const findOptions = { where: { uuid } }
    if (repoFindTransformer) repoFindTransformer(findOptions)

    const { id } = await this.findOneOrFail(findOptions)

    await this.userRepository.delete(id)

    return true
  }

  async sendVerifyEmailToken(uuid: string): Promise<boolean> {
    const userRecord = await this.findOneOrFail({ where: { uuid }, relations: [] })

    if (!userRecord.isVerifyEmailTokenValid()) {
      userRecord.generateVerifyEmailToken()
      await this.userRepository.save(userRecord)
    }

    const { email, verifyEmailToken } = userRecord
    const jwtToken = await generateJWT({ email, verifyEmailToken })

    await this.mailerService.sendTemplateMail({ key: 'verify-email', data: { jwtToken } }, { to: email })

    return true
  }

  async verifyEmail(input: UserVerifyEmailInput): Promise<boolean> {
    const { token } = input
    const { email, verifyEmailToken } = decodeJWT(token)

    if (!verifyEmailToken) throw new CustomException('VERIFY_EMAIL_TOKEN_IS_REQUIRED')

    const userRecord = await this.findOneOrFail({ where: { email, verifyEmailToken }, relations: [] })
    if (!userRecord.isVerifyEmailTokenValid()) throw new CustomException('ACTIVATE_ACCOUNT_TOKEN_EXPIRED')

    userRecord.emailVerified = true
    userRecord.verifyEmailToken = null
    userRecord.verifyEmailExpiryDate = null
    await this.userRepository.save(userRecord)

    return true
  }

  async sendActivateAccountToken(uuid: string, customQueryRunner?: QueryRunner): Promise<boolean> {
    const userRepository = customQueryRunner ? customQueryRunner.manager.getRepository(UserEntity) : this.userRepository

    const userRecord = await this.findOneOrFail({ where: { uuid }, relations: [] }, customQueryRunner)

    if (!userRecord.isActivateAccountTokenValid()) {
      userRecord.generateActivateAccountToken()
      await userRepository.save(userRecord)
    }

    const { email, activateAccountToken, firstName } = userRecord
    const jwtToken = await generateJWT({ email, activateAccountToken })
    await this.mailerService.sendTemplateMail({ key: 'user-created', data: { jwtToken, firstName } }, { to: email })

    return true
  }

  async getUserFromActivationToken(token: string): Promise<UserEntity> {
    const { email, activateAccountToken } = decodeJWT(token)

    if (!activateAccountToken) throw new CustomException('ACTIVATE_ACCOUNT_TOKEN_IS_REQUIRED')

    const userRecord = await this.findOneOrFail({ where: { email, activateAccountToken }, relations: [] })
    if (!userRecord.isActivateAccountTokenValid()) throw new CustomException('ACTIVATE_ACCOUNT_TOKEN_EXPIRED')

    return userRecord
  }

  async activateAccount(userActivateAccountInput: UserActivateAccountInput): Promise<UserEntity> {
    const { token, password } = userActivateAccountInput
    const userRecord = await this.getUserFromActivationToken(token)

    userRecord.password = password
    userRecord.activateAccountToken = null
    userRecord.activateAccountExpiryDate = null
    userRecord.status = AccountStatus.ENABLED
    userRecord.emailVerified = true
    await this.userRepository.save(userRecord)

    return userRecord
  }

  async getEmailFromResetPasswordToken(token: string): Promise<string> {
    const { email, passwordResetToken } = decodeJWT(token)

    if (!passwordResetToken) throw new CustomException('PASSWORD_RESET_TOKEN_IS_REQUIRED')

    const userRecord = await this.findOneOrFail({ where: { email, passwordResetToken }, relations: [] })
    if (!userRecord.isPasswordResetTokenValid()) throw new CustomException('PASSWORD_RESET_TOKEN_EXPIRED')

    return email
  }

  async sendPasswordResetToken(email: string): Promise<boolean> {
    const userRecord = await this.findOneOrFail({ where: { email }, relations: [] })

    if (!userRecord.isPasswordResetTokenValid()) {
      userRecord.generatePasswordResetToken()
      await this.userRepository.save(userRecord)
    }

    const { passwordResetToken } = userRecord
    const jwtToken = await generateJWT({ email, passwordResetToken })
    await this.mailerService.sendTemplateMail({ key: 'reset-password', data: { jwtToken } }, { to: email })

    return true
  }

  async setPasswordFromPasswordResetToken(passwordResetInput: UserPasswordResetInput): Promise<boolean> {
    const { token, password } = passwordResetInput
    const { email, passwordResetToken } = decodeJWT(token)

    const userRecord = await this.findOneOrFail({ where: { email, passwordResetToken } })
    if (!userRecord.isPasswordResetTokenValid()) throw new CustomException('PASSWORD_RESET_TOKEN_EXPIRED')

    userRecord.password = password
    userRecord.passwordResetToken = null
    userRecord.passwordResetExpiryDate = null
    await this.userRepository.save(userRecord)

    return true
  }

  count(roleId: number): Promise<number> {
    return this.userRepository.count({ where: { role: { id: roleId } }, relations: ['role'] })
  }
}

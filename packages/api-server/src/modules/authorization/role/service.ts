import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'

import { ITypeOrmService } from '../../../common/interfaces/typeorm-service'
import { RoleEntity } from '../../../entities'
import { PermissionService } from '../permission/service'
import { CustomException } from '../../../exceptions/custom-exception/exception'
import { RoleCreateInput, RoleDeleteInput, RoleUpdateInput } from '../../../graphql/schema'
import {
  getDefaultServiceOptions,
  IServiceBaseOptions,
  IServiceDeleteOptionsRepo,
  IServiceUpdateOptionsRepo,
} from '../../../common/types/service-options'

import { defaultRoles } from './fixtures/role.default'

@Injectable()
export class RoleService implements ITypeOrmService<RoleEntity>, OnModuleInit {
  constructor(
    @InjectRepository(RoleEntity) private readonly roleRepository: Repository<RoleEntity>,
    @Inject(forwardRef(() => PermissionService)) private readonly permissionService: PermissionService
  ) {}

  async onModuleInit() {
    await this.permissionService.createDefaultPermission()
    await this.createDefaultRoles()
  }

  async create(
    create: RoleCreateInput,
    options: IServiceBaseOptions = getDefaultServiceOptions()
  ): Promise<RoleEntity> {
    const { permissions: permissionsInput, ...restInput } = create
    const { relations } = options

    const permissions = await this.permissionService.findManyByNamesOrFail(permissionsInput)

    const dryRoleRecord = new RoleEntity({
      permissions,
      ...restInput,
    })

    const { id } = await this.roleRepository.save(dryRoleRecord)

    return this.findOneOrFail({ where: { id }, relations })
  }

  findOne(options: FindOneOptions<RoleEntity>): Promise<RoleEntity | undefined> {
    return this.roleRepository.findOne(options)
  }

  async findOneOrFail(options: FindOneOptions<RoleEntity>): Promise<RoleEntity> {
    const roleRecord = await this.findOne(options)
    if (!roleRecord) throw new CustomException('ROLE_NOT_FOUND')

    return roleRecord
  }

  findMany(options: FindManyOptions<RoleEntity>): Promise<RoleEntity[]> {
    return this.roleRepository.find(options)
  }

  async update(
    updateInput: RoleUpdateInput,
    options: IServiceUpdateOptionsRepo<RoleEntity> = getDefaultServiceOptions()
  ): Promise<RoleEntity> {
    const { uuid, permissions: permissionsInput, ...restInput } = updateInput
    const { relations, repoFindTransformer } = options

    const findOptions = {
      where: { uuid },
      relations: ['permissions'],
    }

    if (repoFindTransformer) repoFindTransformer(findOptions)

    const roleRecord = await this.findOneOrFail(findOptions)
    const { permissions: permissionsRecords } = roleRecord

    const permissions = permissionsInput
      ? await this.permissionService.findManyByNamesOrFail(permissionsInput)
      : permissionsRecords

    roleRecord.patch({ permissions, ...restInput })
    await this.roleRepository.save(roleRecord)

    return this.findOneOrFail({ where: { id: roleRecord.id }, relations })
  }

  async delete(deleteInput: RoleDeleteInput, options: IServiceDeleteOptionsRepo<RoleEntity> = {}): Promise<boolean> {
    const { uuid } = deleteInput
    const { repoFindTransformer } = options

    const findOptions = { where: { uuid } }
    if (repoFindTransformer) repoFindTransformer(findOptions)

    const { id } = await this.findOneOrFail(findOptions)

    await this.roleRepository.delete(id)

    return true
  }

  async createDefaultRoles(): Promise<RoleEntity[] | null> {
    const roles = await this.findMany({})
    if (roles.length > 0) return null

    return Promise.all(
      Object.keys(defaultRoles).map((defaultRoleName) =>
        this.create({ permissions: defaultRoles[defaultRoleName], name: defaultRoleName })
      )
    )
  }
}

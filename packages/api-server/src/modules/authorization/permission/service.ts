import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CustomException } from '../../../exceptions/custom-exception/exception'
import { PermissionEntity } from '../../../entities'
import { PermissionNames } from '../../../graphql/schema'

@Injectable()
export class PermissionService implements OnModuleInit {
  constructor(
    @InjectRepository(PermissionEntity) private readonly permissionRepository: Repository<PermissionEntity>
  ) {}

  async onModuleInit(): Promise<void> {
    await this.assertPermissionsSyncWithDatabase()
  }

  findManyByNamesOrFail(names: PermissionNames[]): Promise<PermissionEntity[]> {
    return Promise.all(names.map((name) => this.findOneByNameOrFail(name)))
  }

  async findOneByNameOrFail(name: PermissionNames): Promise<PermissionEntity> {
    const record = await this.permissionRepository.findOne({ where: { name } })
    if (!record) throw new CustomException('PERMISSION_NOT_FOUND')

    return record
  }

  async createDefaultPermission() {
    const permissions = await this.permissionRepository.find({})
    if (permissions.length > 0) return

    return Promise.all(
      Object.keys(PermissionNames).map((permissionName) =>
        this.permissionRepository.save(
          new PermissionEntity({
            // @ts-ignore
            name: PermissionNames[permissionName],
          })
        )
      )
    )
  }

  async assertPermissionsSyncWithDatabase() {
    const names = Object.keys(PermissionNames)
    const records = await this.permissionRepository.find({})

    await Promise.all(
      records.map((record) => {
        const stillExist = names.find((name) => name === record.name)
        if (!stillExist)
          Logger.error(`Permission ${record.name} does not exist anymore please create a migration to remove it.`)
      })
    )

    await Promise.all(
      names.map(async (name) => {
        try {
          await this.permissionRepository.findOne({ where: { name } })
        } catch (err) {
          Logger.error(`Permission ${name} does not exist in the database please create a migration to add it.`)
        }
      })
    )
  }
}

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, QueryRunner, Repository } from 'typeorm'

import { StoreCreateInput, StoreDeleteInput, StoreUpdateInput } from '../../graphql/schema'
import { CustomException } from '../../exceptions/custom-exception/exception'
import { StoreEntity } from '../../entities'
import { ITypeOrmService } from '../../common/interfaces/typeorm-service'
import {
  getDefaultServiceOptions,
  IServiceBaseOptions,
  IServiceDeleteOptionsRepo,
  IServiceUpdateOptionsRepo,
} from '../../common/types/service-options'

@Injectable()
export class StoreService implements ITypeOrmService<StoreEntity> {
  constructor(@InjectRepository(StoreEntity) private readonly storeRepository: Repository<StoreEntity>) {}

  async create(
    createInput: StoreCreateInput,
    options: IServiceBaseOptions = getDefaultServiceOptions()
  ): Promise<StoreEntity> {
    const { name } = createInput
    const { relations, customQueryRunner } = options

    const storeRepository = customQueryRunner
      ? customQueryRunner.manager.getRepository(StoreEntity)
      : this.storeRepository

    const dryWordCardRecord = new StoreEntity({ name })
    const { id } = await storeRepository.save(dryWordCardRecord)

    return this.findOneOrFail({ where: { id }, relations }, customQueryRunner)
  }

  findOne(options: FindOneOptions<StoreEntity>, customQueryRunner?: QueryRunner): Promise<StoreEntity | undefined> {
    const storeRepository = customQueryRunner
      ? customQueryRunner.manager.getRepository(StoreEntity)
      : this.storeRepository

    return storeRepository.findOne(options)
  }

  async findOneOrFail(options: FindOneOptions<StoreEntity>, customQueryRunner?: QueryRunner): Promise<StoreEntity> {
    const storeRecord = await this.findOne(options, customQueryRunner)
    if (!storeRecord) throw new CustomException('STORE_NOT_FOUND')

    return storeRecord
  }

  findMany(options: FindManyOptions<StoreEntity>): Promise<StoreEntity[]> {
    return this.storeRepository.find(options)
  }

  async update(
    updateInput: StoreUpdateInput,
    options: IServiceUpdateOptionsRepo<StoreEntity> = getDefaultServiceOptions()
  ): Promise<StoreEntity> {
    const { uuid, name } = updateInput
    const { relations, repoFindTransformer } = options

    const findOptions = {
      where: { uuid },
    }
    if (repoFindTransformer) repoFindTransformer(findOptions)

    const storeRecord = await this.findOneOrFail(findOptions)

    storeRecord.patch({ name })
    await this.storeRepository.save(storeRecord)

    return this.findOneOrFail({ where: { id: storeRecord.id }, relations })
  }

  async delete(deleteInput: StoreDeleteInput, options: IServiceDeleteOptionsRepo<StoreEntity> = {}): Promise<boolean> {
    const { uuid } = deleteInput

    const { repoFindTransformer } = options

    const findOptions = { where: { uuid } }
    if (repoFindTransformer) repoFindTransformer(findOptions)

    const { id } = await this.findOneOrFail(findOptions)

    await this.storeRepository.delete(id)

    return true
  }
}

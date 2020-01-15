import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, QueryRunner, Repository } from 'typeorm'

import { AisleCreateInput, AisleDeleteInput, AisleUpdateInput } from '../../../graphql/schema'
import { CustomException } from '../../../exceptions/custom-exception/exception'
import { AisleEntity } from '../../../entities'
import { StoreService, UserService } from '../../../services'
import { ITypeOrmService } from '../../../common/interfaces/typeorm-service'
import {
  getDefaultServiceOptions,
  IServiceBaseOptions,
  IServiceDeleteOptionsRepo,
  IServiceUpdateOptionsRepo,
} from '../../../common/types/service-options'

@Injectable()
export class AisleService implements ITypeOrmService<AisleEntity> {
  constructor(
    @InjectRepository(AisleEntity) private readonly aisleRepository: Repository<AisleEntity>,
    @Inject(forwardRef(() => StoreService)) private readonly storeService: StoreService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService
  ) {}

  async create(
    createInput: AisleCreateInput,
    options: IServiceBaseOptions = getDefaultServiceOptions()
  ): Promise<AisleEntity> {
    const { name, storeUuid, sellersUuids } = createInput
    const { relations, customQueryRunner } = options

    const aisleRepository = customQueryRunner
      ? customQueryRunner.manager.getRepository(AisleEntity)
      : this.aisleRepository

    const store = await this.storeService.findOneOrFail({ where: { uuid: storeUuid } })
    const sellers = await Promise.all(
      sellersUuids.map((sellerUuid) => this.userService.findOneOrFail({ where: { uuid: sellerUuid } }))
    )

    const dryAisleRecord = new AisleEntity({ name, store, sellers })
    const { id } = await aisleRepository.save(dryAisleRecord)

    return this.findOneOrFail({ where: { id }, relations }, customQueryRunner)
  }

  findOne(options: FindOneOptions<AisleEntity>, customQueryRunner?: QueryRunner): Promise<AisleEntity | undefined> {
    const aisleRepository = customQueryRunner
      ? customQueryRunner.manager.getRepository(AisleEntity)
      : this.aisleRepository

    return aisleRepository.findOne(options)
  }

  async findOneOrFail(options: FindOneOptions<AisleEntity>, customQueryRunner?: QueryRunner): Promise<AisleEntity> {
    const storeRecord = await this.findOne(options, customQueryRunner)
    if (!storeRecord) throw new CustomException('STORE_NOT_FOUND')

    return storeRecord
  }

  findMany(options: FindManyOptions<AisleEntity>): Promise<AisleEntity[]> {
    return this.aisleRepository.find(options)
  }

  async update(
    updateInput: AisleUpdateInput,
    options: IServiceUpdateOptionsRepo<AisleEntity> = getDefaultServiceOptions()
  ): Promise<AisleEntity> {
    const { uuid, name } = updateInput
    const { relations, repoFindTransformer } = options

    const findOptions = {
      where: { uuid },
    }
    if (repoFindTransformer) repoFindTransformer(findOptions)

    const aisleRecord = await this.findOneOrFail(findOptions)

    aisleRecord.patch({ name })
    await this.aisleRepository.save(aisleRecord)

    return this.findOneOrFail({ where: { id: aisleRecord.id }, relations })
  }

  async delete(deleteInput: AisleDeleteInput, options: IServiceDeleteOptionsRepo<AisleEntity> = {}): Promise<boolean> {
    const { uuid } = deleteInput

    const { repoFindTransformer } = options

    const findOptions = { where: { uuid } }
    if (repoFindTransformer) repoFindTransformer(findOptions)

    const { id } = await this.findOneOrFail(findOptions)

    await this.aisleRepository.delete(id)

    return true
  }
}

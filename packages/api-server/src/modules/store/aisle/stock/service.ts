import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, QueryRunner, Repository } from 'typeorm'

import { StockCreateInput, StockDeleteInput, StockUpdateInput } from '../../../../graphql/schema'
import { CustomException } from '../../../../exceptions/custom-exception/exception'
import { StockEntity } from '../../../../entities'
import { ProductService, AisleService } from '../../../../services'
import { ITypeOrmService } from '../../../../common/interfaces/typeorm-service'
import {
  getDefaultServiceOptions,
  IServiceBaseOptions,
  IServiceDeleteOptionsRepo,
  IServiceUpdateOptionsRepo,
} from '../../../../common/types/service-options'

@Injectable()
export class StockService implements ITypeOrmService<StockEntity> {
  constructor(
    @InjectRepository(StockEntity) private readonly stockRepository: Repository<StockEntity>,
    @Inject(forwardRef(() => AisleService)) private readonly aisleService: AisleService,
    @Inject(forwardRef(() => ProductService)) private readonly productService: ProductService
  ) {}

  async create(
    createInput: StockCreateInput,
    options: IServiceBaseOptions = getDefaultServiceOptions()
  ): Promise<StockEntity> {
    const { count, aisleUuid, productUuid } = createInput
    const { relations, customQueryRunner } = options

    const stockRepository = customQueryRunner
      ? customQueryRunner.manager.getRepository(StockEntity)
      : this.stockRepository

    const aisle = await this.aisleService.findOneOrFail({ where: { uuid: aisleUuid } })
    const product = await this.productService.findOneOrFail({ where: { uuid: productUuid } })

    const dryStockRecord = new StockEntity({ count, aisle, product })
    const { id } = await stockRepository.save(dryStockRecord)

    return this.findOneOrFail({ where: { id }, relations }, customQueryRunner)
  }

  findOne(options: FindOneOptions<StockEntity>, customQueryRunner?: QueryRunner): Promise<StockEntity | undefined> {
    const aisleRepository = customQueryRunner
      ? customQueryRunner.manager.getRepository(StockEntity)
      : this.stockRepository

    return aisleRepository.findOne(options)
  }

  async findOneOrFail(options: FindOneOptions<StockEntity>, customQueryRunner?: QueryRunner): Promise<StockEntity> {
    const storeRecord = await this.findOne(options, customQueryRunner)
    if (!storeRecord) throw new CustomException('STORE_NOT_FOUND')

    return storeRecord
  }

  findMany(options: FindManyOptions<StockEntity>): Promise<StockEntity[]> {
    return this.stockRepository.find(options)
  }

  async update(
    updateInput: StockUpdateInput,
    options: IServiceUpdateOptionsRepo<StockEntity> = getDefaultServiceOptions()
  ): Promise<StockEntity> {
    const { uuid, count } = updateInput
    const { relations, repoFindTransformer } = options

    const findOptions = {
      where: { uuid },
    }
    if (repoFindTransformer) repoFindTransformer(findOptions)

    const stockRecord = await this.findOneOrFail(findOptions)

    stockRecord.patch({ count })
    await this.stockRepository.save(stockRecord)

    return this.findOneOrFail({ where: { id: stockRecord.id }, relations })
  }

  async delete(deleteInput: StockDeleteInput, options: IServiceDeleteOptionsRepo<StockEntity> = {}): Promise<boolean> {
    const { uuid } = deleteInput

    const { repoFindTransformer } = options

    const findOptions = { where: { uuid } }
    if (repoFindTransformer) repoFindTransformer(findOptions)

    const { id } = await this.findOneOrFail(findOptions)

    await this.stockRepository.delete(id)

    return true
  }
}

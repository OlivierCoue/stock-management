import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, QueryRunner, Repository } from 'typeorm'

import { ProductCreateInput, ProductDeleteInput, ProductUpdateInput } from '../../graphql/schema'
import { CustomException } from '../../exceptions/custom-exception/exception'
import { ProductEntity } from '../../entities'
import { ITypeOrmService } from '../../common/interfaces/typeorm-service'
import {
  getDefaultServiceOptions,
  IServiceBaseOptions,
  IServiceDeleteOptionsRepo,
  IServiceUpdateOptionsRepo,
} from '../../common/types/service-options'

@Injectable()
export class ProductService implements ITypeOrmService<ProductEntity> {
  constructor(@InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>) {}

  async create(
    createInput: ProductCreateInput,
    options: IServiceBaseOptions = getDefaultServiceOptions()
  ): Promise<ProductEntity> {
    const { name, price } = createInput
    const { relations, customQueryRunner } = options

    const productRepository = customQueryRunner
      ? customQueryRunner.manager.getRepository(ProductEntity)
      : this.productRepository

    const dryProductRecord = new ProductEntity({ name, price })
    const { id } = await productRepository.save(dryProductRecord)

    return this.findOneOrFail({ where: { id }, relations }, customQueryRunner)
  }

  findOne(options: FindOneOptions<ProductEntity>, customQueryRunner?: QueryRunner): Promise<ProductEntity | undefined> {
    const aisleRepository = customQueryRunner
      ? customQueryRunner.manager.getRepository(ProductEntity)
      : this.productRepository

    return aisleRepository.findOne(options)
  }

  async findOneOrFail(options: FindOneOptions<ProductEntity>, customQueryRunner?: QueryRunner): Promise<ProductEntity> {
    const storeRecord = await this.findOne(options, customQueryRunner)
    if (!storeRecord) throw new CustomException('STORE_NOT_FOUND')

    return storeRecord
  }

  findMany(options: FindManyOptions<ProductEntity>): Promise<ProductEntity[]> {
    return this.productRepository.find(options)
  }

  async update(
    updateInput: ProductUpdateInput,
    options: IServiceUpdateOptionsRepo<ProductEntity> = getDefaultServiceOptions()
  ): Promise<ProductEntity> {
    const { uuid, name, price } = updateInput
    const { relations, repoFindTransformer } = options

    const findOptions = {
      where: { uuid },
    }
    if (repoFindTransformer) repoFindTransformer(findOptions)

    const productRecord = await this.findOneOrFail(findOptions)

    productRecord.patch({ name, price })
    await this.productRepository.save(productRecord)

    return this.findOneOrFail({ where: { id: productRecord.id }, relations })
  }

  async delete(
    deleteInput: ProductDeleteInput,
    options: IServiceDeleteOptionsRepo<ProductEntity> = {}
  ): Promise<boolean> {
    const { uuid } = deleteInput

    const { repoFindTransformer } = options

    const findOptions = { where: { uuid } }
    if (repoFindTransformer) repoFindTransformer(findOptions)

    const { id } = await this.findOneOrFail(findOptions)

    await this.productRepository.delete(id)

    return true
  }
}

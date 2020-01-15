import { Args, Context, Mutation, Query, Resolver, ResolverPrefix } from '@nestjs/graphql'
import { GraphQLRelations } from '@mysg/nest-common'
import { classToPlain } from 'class-transformer'
import { UseRoles } from 'nest-access-control'
import { forwardRef, Inject } from '@nestjs/common'

import {
  Stock,
  StockCreateInput,
  StockDeleteInput,
  StockFindManyInput,
  StockFindOneInput,
  StockUpdateInput,
} from '../../../../graphql/schema'
import { IGraphQLContext } from '../../../../graphql/options'
import { AuthorizationResources } from '../../../authorization/permission-builder'

import { StockService } from './service'

const commonRelationsIncluded = ['aisle', 'product']

@Resolver('Stock')
@ResolverPrefix('Stock_')
export class StockResolver {
  constructor(@Inject(forwardRef(() => StockService)) private readonly stockService: StockService) {}

  @UseRoles({
    resource: AuthorizationResources.STOCK,
    action: 'create',
    possession: 'any',
  })
  @Mutation()
  createOne(
    @Args('createInput') createInput: StockCreateInput,
    @GraphQLRelations({ entityName: 'StockEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<Stock> {
    return this.stockService.create(createInput, { relations })
  }

  @UseRoles({
    resource: AuthorizationResources.STOCK,
    action: 'read',
    possession: 'own',
  })
  @Query()
  findOne(
    @Args('findOneInput') findOneInput: StockFindOneInput,
    @GraphQLRelations({ entityName: 'StockEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<Stock | undefined> {
    return this.stockService.findOne(classToPlain({ ...findOneInput, relations }))
  }

  @UseRoles({
    resource: AuthorizationResources.STOCK,
    action: 'read',
    possession: 'own',
  })
  @Query()
  findMany(
    @Args('findManyInput') findManyInput: StockFindManyInput,
    @GraphQLRelations({ entityName: 'StockEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<Stock[]> {
    return this.stockService.findMany(classToPlain({ ...findManyInput, relations }))
  }

  @UseRoles({
    resource: AuthorizationResources.STOCK,
    action: 'update',
    possession: 'own',
  })
  @Mutation()
  updateOne(
    @Args('updateInput') updateInput: StockUpdateInput,
    @GraphQLRelations({ entityName: 'StockEntity', include: commonRelationsIncluded }) relations: string[]
  ): Promise<Stock> {
    return this.stockService.update(updateInput, {
      relations,
    })
  }

  @UseRoles({
    resource: AuthorizationResources.STOCK,
    action: 'delete',
    possession: 'own',
  })
  @Mutation()
  deleteOne(@Args('deleteInput') deleteInput: StockDeleteInput): Promise<boolean> {
    return this.stockService.delete(deleteInput)
  }
}

import { Args, Context, Mutation, Query, Resolver, ResolverPrefix } from '@nestjs/graphql'
import { GraphQLRelations } from '@mysg/nest-common'
import { classToPlain } from 'class-transformer'
import { UseRoles } from 'nest-access-control'
import { forwardRef, Inject } from '@nestjs/common'

import {
  Store,
  StoreCreateInput,
  StoreDeleteInput,
  StoreFindManyInput,
  StoreFindOneInput,
  StoreUpdateInput,
} from '../../graphql/schema'
import { IGraphQLContext } from '../../graphql/options'
import { AuthorizationResources } from '../authorization/permission-builder'

import { StoreService } from './service'

const commonRelationsIncluded = ['aisles', 'aisles.seller', 'aisles.stocks', 'aisles.stocks.product']

@Resolver('Store')
@ResolverPrefix('Store_')
export class StoreResolver {
  constructor(@Inject(forwardRef(() => StoreService)) private readonly storeService: StoreService) {}

  @UseRoles({
    resource: AuthorizationResources.STORE,
    action: 'create',
    possession: 'any',
  })
  @Mutation()
  createOne(
    @Args('createInput') createInput: StoreCreateInput,
    @GraphQLRelations({ entityName: 'StoreEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<Store> {
    return this.storeService.create(createInput, { relations })
  }

  @UseRoles({
    resource: AuthorizationResources.STORE,
    action: 'read',
    possession: 'own',
  })
  @Query()
  findOne(
    @Args('findOneInput') findOneInput: StoreFindOneInput,
    @GraphQLRelations({ entityName: 'StoreEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<Store | undefined> {
    return this.storeService.findOne(classToPlain({ ...findOneInput, relations }))
  }

  @UseRoles({
    resource: AuthorizationResources.STORE,
    action: 'read',
    possession: 'own',
  })
  @Query()
  findMany(
    @Args('findManyInput') findManyInput: StoreFindManyInput,
    @GraphQLRelations({ entityName: 'StoreEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<Store[]> {
    return this.storeService.findMany(classToPlain({ ...findManyInput, relations }))
  }

  @UseRoles({
    resource: AuthorizationResources.STORE,
    action: 'update',
    possession: 'own',
  })
  @Mutation()
  updateOne(
    @Args('updateInput') updateInput: StoreUpdateInput,
    @GraphQLRelations({ entityName: 'StoreEntity', include: commonRelationsIncluded }) relations: string[]
  ): Promise<Store> {
    return this.storeService.update(updateInput, {
      relations,
    })
  }

  @UseRoles({
    resource: AuthorizationResources.STORE,
    action: 'delete',
    possession: 'own',
  })
  @Mutation()
  deleteOne(@Args('deleteInput') deleteInput: StoreDeleteInput): Promise<boolean> {
    return this.storeService.delete(deleteInput)
  }
}

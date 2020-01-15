import { Args, Context, Mutation, Query, Resolver, ResolverPrefix } from '@nestjs/graphql'
import { GraphQLRelations } from '@mysg/nest-common'
import { classToPlain } from 'class-transformer'
import { UseRoles } from 'nest-access-control'
import { forwardRef, Inject } from '@nestjs/common'

import {
  Aisle,
  AisleCreateInput,
  AisleDeleteInput,
  AisleFindManyInput,
  AisleFindOneInput,
  AisleUpdateInput,
} from '../../../graphql/schema'
import { IGraphQLContext } from '../../../graphql/options'
import { AuthorizationResources } from '../../authorization/permission-builder'

import { AisleService } from './service'

const commonRelationsIncluded = ['store', 'sellers', 'stocks', 'stocks.product']

@Resolver('Aisle')
@ResolverPrefix('Aisle_')
export class AisleResolver {
  constructor(@Inject(forwardRef(() => AisleService)) private readonly aisleService: AisleService) {}

  @UseRoles({
    resource: AuthorizationResources.AISLE,
    action: 'create',
    possession: 'any',
  })
  @Mutation()
  createOne(
    @Args('createInput') createInput: AisleCreateInput,
    @GraphQLRelations({ entityName: 'AisleEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<Aisle> {
    return this.aisleService.create(createInput, { relations })
  }

  @UseRoles({
    resource: AuthorizationResources.AISLE,
    action: 'read',
    possession: 'own',
  })
  @Query()
  findOne(
    @Args('findOneInput') findOneInput: AisleFindOneInput,
    @GraphQLRelations({ entityName: 'AisleEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<Aisle | undefined> {
    return this.aisleService.findOne(classToPlain({ ...findOneInput, relations }))
  }

  @UseRoles({
    resource: AuthorizationResources.AISLE,
    action: 'read',
    possession: 'own',
  })
  @Query()
  findMany(
    @Args('findManyInput') findManyInput: AisleFindManyInput,
    @GraphQLRelations({ entityName: 'AisleEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<Aisle[]> {
    return this.aisleService.findMany(classToPlain({ ...findManyInput, relations }))
  }

  @UseRoles({
    resource: AuthorizationResources.AISLE,
    action: 'update',
    possession: 'own',
  })
  @Mutation()
  updateOne(
    @Args('updateInput') updateInput: AisleUpdateInput,
    @GraphQLRelations({ entityName: 'AisleEntity', include: commonRelationsIncluded }) relations: string[]
  ): Promise<Aisle> {
    return this.aisleService.update(updateInput, {
      relations,
    })
  }

  @UseRoles({
    resource: AuthorizationResources.AISLE,
    action: 'delete',
    possession: 'own',
  })
  @Mutation()
  deleteOne(@Args('deleteInput') deleteInput: AisleDeleteInput): Promise<boolean> {
    return this.aisleService.delete(deleteInput)
  }
}

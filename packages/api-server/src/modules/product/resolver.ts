import { Args, Context, Mutation, Query, Resolver, ResolverPrefix } from '@nestjs/graphql'
import { GraphQLRelations } from '@mysg/nest-common'
import { classToPlain } from 'class-transformer'
import { UseRoles } from 'nest-access-control'
import { forwardRef, Inject } from '@nestjs/common'

import {
  Product,
  ProductCreateInput,
  ProductDeleteInput,
  ProductFindManyInput,
  ProductFindOneInput,
  ProductUpdateInput,
} from '../../graphql/schema'
import { IGraphQLContext } from '../../graphql/options'
import { AuthorizationResources } from '../authorization/permission-builder'

import { ProductService } from './service'

const commonRelationsIncluded = ['usedInStocks']

@Resolver('Product')
@ResolverPrefix('Product_')
export class ProductResolver {
  constructor(@Inject(forwardRef(() => ProductService)) private readonly productService: ProductService) {}

  @UseRoles({
    resource: AuthorizationResources.PRODUCT,
    action: 'create',
    possession: 'any',
  })
  @Mutation()
  createOne(
    @Args('createInput') createInput: ProductCreateInput,
    @GraphQLRelations({ entityName: 'ProductEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<Product> {
    return this.productService.create(createInput, { relations })
  }

  @UseRoles({
    resource: AuthorizationResources.PRODUCT,
    action: 'read',
    possession: 'own',
  })
  @Query()
  findOne(
    @Args('findOneInput') findOneInput: ProductFindOneInput,
    @GraphQLRelations({ entityName: 'ProductEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<Product | undefined> {
    return this.productService.findOne(classToPlain({ ...findOneInput, relations }))
  }

  @UseRoles({
    resource: AuthorizationResources.PRODUCT,
    action: 'read',
    possession: 'own',
  })
  @Query()
  findMany(
    @Args('findManyInput') findManyInput: ProductFindManyInput,
    @GraphQLRelations({ entityName: 'ProductEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<Product[]> {
    return this.productService.findMany(classToPlain({ ...findManyInput, relations }))
  }

  @UseRoles({
    resource: AuthorizationResources.PRODUCT,
    action: 'update',
    possession: 'own',
  })
  @Mutation()
  updateOne(
    @Args('updateInput') updateInput: ProductUpdateInput,
    @GraphQLRelations({ entityName: 'ProductEntity', include: commonRelationsIncluded }) relations: string[]
  ): Promise<Product> {
    return this.productService.update(updateInput, {
      relations,
    })
  }

  @UseRoles({
    resource: AuthorizationResources.PRODUCT,
    action: 'delete',
    possession: 'own',
  })
  @Mutation()
  deleteOne(@Args('deleteInput') deleteInput: ProductDeleteInput): Promise<boolean> {
    return this.productService.delete(deleteInput)
  }
}

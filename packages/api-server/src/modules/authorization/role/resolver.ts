import { Args, Context, Mutation, Parent, Query, ResolveProperty, Resolver, ResolverPrefix } from '@nestjs/graphql'
import { GraphQLRelations } from '@mysg/nest-common'
import { GraphQLUpload } from 'graphql-upload'
import { classToPlain } from 'class-transformer'
import { UseRoles } from 'nest-access-control'
import { forwardRef, Inject } from '@nestjs/common'

import {
  PermissionNames,
  Role,
  RoleCreateInput,
  RoleDeleteInput,
  RoleFindManyInput,
  RoleFindOneInput,
  RoleUpdateInput,
} from '../../../graphql/schema'
import { IGraphQLContext } from '../../../graphql/options'
import { AuthorizationResources } from '../permission-builder'
import { RoleEntity } from '../../../entities'
import { UserService } from '../../user/service'

import { RoleService } from './service'

const commonRelationsIncluded = ['permissions']

const commonGraphQLRelations = {
  entityName: 'RoleEntity',
  include: commonRelationsIncluded,
  mappedRelations: { permissionNames: 'permissions' },
}

@Resolver('Role')
@ResolverPrefix('Role_')
export class RoleResolver {
  constructor(
    @Inject(forwardRef(() => RoleService)) private readonly roleService: RoleService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService
  ) {}

  @UseRoles({
    resource: AuthorizationResources.ROLE,
    action: 'create',
    possession: 'own',
  })
  @Mutation()
  createOne(
    @Args({ name: 'createInput', type: () => GraphQLUpload }) createInput: RoleCreateInput,
    @GraphQLRelations(commonGraphQLRelations) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<Role> {
    return this.roleService.create({ ...createInput }, { relations })
  }

  @UseRoles({
    resource: AuthorizationResources.ROLE,
    action: 'create',
    possession: 'own',
  })
  @Mutation()
  createMany(
    @Args({ name: 'createInputs', type: () => GraphQLUpload }) createInputs: RoleCreateInput[],
    @GraphQLRelations(commonGraphQLRelations) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<Role[]> {
    return Promise.all(createInputs.map((createInput) => this.roleService.create({ ...createInput }, { relations })))
  }

  @UseRoles({
    resource: AuthorizationResources.ROLE,
    action: 'read',
    possession: 'own',
  })
  @Query()
  findOne(
    @Args('findOneInput') findOneInput: RoleFindOneInput,
    @GraphQLRelations(commonGraphQLRelations) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<Role | undefined> {
    return this.roleService.findOne(classToPlain({ ...findOneInput, relations }))
  }

  @UseRoles({
    resource: AuthorizationResources.ROLE,
    action: 'read',
    possession: 'own',
  })
  @Query()
  findMany(
    @Args('findManyInput') findManyInput: RoleFindManyInput,
    @GraphQLRelations(commonGraphQLRelations) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<Role[]> {
    return this.roleService.findMany(classToPlain({ ...findManyInput, relations }))
  }

  @UseRoles({
    resource: AuthorizationResources.ROLE,
    action: 'update',
    possession: 'own',
  })
  @Mutation()
  updateOne(
    @Args('updateInput') updateInput: RoleUpdateInput,
    @GraphQLRelations(commonGraphQLRelations) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<Role> {
    return this.roleService.update(updateInput, {
      relations,
    })
  }

  @UseRoles({
    resource: AuthorizationResources.ROLE,
    action: 'update',
    possession: 'own',
  })
  @Mutation()
  updateMany(
    @Args('updateInputs') updateInputs: RoleUpdateInput[],
    @GraphQLRelations(commonGraphQLRelations) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<Role[]> {
    return Promise.all(
      updateInputs.map((updateInput) =>
        this.roleService.update(updateInput, {
          relations,
        })
      )
    )
  }

  @UseRoles({
    resource: AuthorizationResources.ROLE,
    action: 'delete',
    possession: 'own',
  })
  @Mutation()
  deleteOne(@Args('deleteInput') deleteInput: RoleDeleteInput, @Context() context: IGraphQLContext): Promise<boolean> {
    return this.roleService.delete(deleteInput)
  }

  @UseRoles({
    resource: AuthorizationResources.ROLE,
    action: 'delete',
    possession: 'own',
  })
  @Mutation()
  deleteMany(
    @Args('deleteInputs') deleteInputs: RoleDeleteInput[],
    @Context() context: IGraphQLContext
  ): Promise<boolean[]> {
    return Promise.all(deleteInputs.map((deleteInput) => this.roleService.delete(deleteInput)))
  }

  @ResolveProperty()
  permissionNames(@Parent() role: RoleEntity): PermissionNames[] {
    return role.permissions ? role.permissions.map((permission) => permission.name).sort() : []
  }

  @ResolveProperty()
  usersCount(@Parent() role: RoleEntity): Promise<number> {
    return this.userService.count(role.id)
  }
}

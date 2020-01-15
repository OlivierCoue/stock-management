import fs from 'fs'

import { Args, Context, Mutation, Query, Resolver, ResolverPrefix } from '@nestjs/graphql'
import { GraphQLRelations } from '@mysg/nest-common'
import { classToPlain } from 'class-transformer'
import { UseRoles } from 'nest-access-control'
import { forwardRef, Inject } from '@nestjs/common'
import convert from 'xml-js'

import {
  User,
  UserActivateAccountInput,
  UserActivationTokenData,
  UserCreateInput,
  UserDeleteInput,
  UserFindManyByPermissionInput,
  UserFindManyInput,
  UserFindOneInput,
  UserPasswordResetInput,
  UserUpdateInput,
  UserVerifyEmailInput,
} from '../../graphql/schema'
import { IGraphQLContext } from '../../graphql/options'
import { AuthorizationResources, permissionsBuilder } from '../authorization/permission-builder'
import { FindOptionsUtils } from '../../common/util/find-options'
import { CustomException } from '../../exceptions/custom-exception/exception'

import { UserService } from './service'

const commonRelationsIncluded = ['role', 'role.permissions']

@Resolver('User')
@ResolverPrefix('User_')
export class UserResolver {
  constructor(@Inject(forwardRef(() => UserService)) private readonly userService: UserService) {}

  @Mutation()
  parseXml() {
    const xml = fs.readFileSync('C:\\git\\projetdico\\aus.xml', 'utf8')
    const result1 = convert.xml2json(xml, { compact: true, spaces: 4 })
    // console.log(result1)

    fs.writeFile('C:\\git\\projetdico\\aus.json', result1, (err) => {
      if (err) {
        return console.log(err)
      }

      return true
    })
  }

  @Mutation()
  async register(
    @Args('createInput') createInput: UserCreateInput,
    @GraphQLRelations({ entityName: 'UserEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<User> {
    const userRecord = await this.userService.create(createInput, { relations })

    await context.req.logout()
    context.req.logIn(userRecord, (err) => {
      if (err) console.error(err)
    })

    return userRecord
  }

  @UseRoles({
    resource: AuthorizationResources.USER,
    action: 'create',
    possession: 'any',
  })
  @Mutation()
  createOne(
    @Args('createInput') createInput: UserCreateInput,
    @GraphQLRelations({ entityName: 'UserEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<User> {
    return this.userService.create(createInput, { relations })
  }

  @UseRoles({
    resource: AuthorizationResources.USER,
    action: 'create',
    possession: 'any',
  })
  @Mutation()
  createMany(
    @Args('createInputs') createInputs: UserCreateInput[],
    @GraphQLRelations({ entityName: 'UserEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<User[]> {
    return Promise.all(createInputs.map((createInput) => this.userService.create(createInput, { relations })))
  }

  @Query()
  getCurrent(
    @GraphQLRelations({
      entityName: 'UserEntity',
      include: commonRelationsIncluded,
      mappedRelations: { 'role.permissionNames': 'permissions' },
    })
    relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<User | null> {
    const { user } = context
    if (!user) return Promise.resolve(null)

    return this.userService.findOneOrFail({ where: { id: user.id }, relations })
  }

  @UseRoles({
    resource: AuthorizationResources.USER,
    action: 'read',
    possession: 'own',
  })
  @Query()
  findOne(
    @Args('findOneInput') findOneInput: UserFindOneInput,
    @GraphQLRelations({ entityName: 'UserEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<User | undefined> {
    return this.userService.findOne(classToPlain({ ...findOneInput, relations }))
  }

  @Query()
  getResetPasswordTokenData(@Args('token') token: string): Promise<string> {
    return this.userService.getEmailFromResetPasswordToken(token)
  }

  @UseRoles({
    resource: AuthorizationResources.USER,
    action: 'read',
    possession: 'own',
  })
  @Query()
  findMany(
    @Args('findManyInput') findManyInput: UserFindManyInput,
    @GraphQLRelations({ entityName: 'UserEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<User[]> {
    return this.userService.findMany(classToPlain({ ...findManyInput, relations }))
  }

  @UseRoles({
    resource: AuthorizationResources.USER,
    action: 'read',
    possession: 'own',
  })
  @Query()
  findManyByPermission(
    @Args('input') input: UserFindManyByPermissionInput,
    @GraphQLRelations({ entityName: 'UserEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<User[]> {
    return this.userService.findManyByPermission({ ...input })
  }

  @Query()
  getActivationTokenData(@Args('token') token: string): Promise<UserActivationTokenData> {
    return this.userService.getUserFromActivationToken(token)
  }

  @UseRoles({
    resource: AuthorizationResources.USER,
    action: 'update',
    possession: 'own',
  })
  @Mutation()
  updateOne(
    @Args('updateInput') updateInput: UserUpdateInput,
    @GraphQLRelations({ entityName: 'UserEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<User> {
    const { user } = context
    if (!user) throw new CustomException('USER_NOT_FOUND')
    const canUpdateAny = permissionsBuilder.can(user.roles).updateAny(AuthorizationResources.USER).granted

    return this.userService.update(updateInput, {
      relations,
      repoFindTransformer: (findOptions) => {
        if (!canUpdateAny) FindOptionsUtils.addWhereCondition(findOptions, 'id', user.id)

        return findOptions
      },
    })
  }

  @UseRoles({
    resource: AuthorizationResources.USER,
    action: 'update',
    possession: 'any',
  })
  @Mutation()
  updateMany(
    @Args('updateInputs') updateInputs: UserUpdateInput[],
    @GraphQLRelations({ entityName: 'UserEntity', include: commonRelationsIncluded }) relations: string[],
    @Context() context: IGraphQLContext
  ): Promise<User[]> {
    return Promise.all(updateInputs.map((updateInput) => this.userService.update(updateInput, { relations })))
  }

  @UseRoles({
    resource: AuthorizationResources.USER,
    action: 'delete',
    possession: 'own',
  })
  @Mutation()
  deleteOne(@Args('deleteInput') deleteInput: UserDeleteInput, @Context() context: IGraphQLContext): Promise<boolean> {
    const { user } = context
    if (!user) throw new CustomException('USER_NOT_FOUND')
    const canDeleteAny = permissionsBuilder.can(user.roles).deleteAny(AuthorizationResources.USER).granted

    return this.userService.delete(deleteInput, {
      repoFindTransformer: (findOptions) => {
        if (!canDeleteAny) FindOptionsUtils.addWhereCondition(findOptions, 'id', user.id)

        return findOptions
      },
    })
  }

  @UseRoles({
    resource: AuthorizationResources.USER,
    action: 'delete',
    possession: 'any',
  })
  @Mutation()
  deleteMany(
    @Args('deleteInputs') deleteInputs: UserDeleteInput[],
    @Context() context: IGraphQLContext
  ): Promise<boolean[]> {
    return Promise.all(deleteInputs.map((deleteInput) => this.userService.delete(deleteInput)))
  }

  @Mutation()
  async activateAccount(
    @Args('userActivateAccountInput') userAccountActivateInput: UserActivateAccountInput,
    @Context() context: IGraphQLContext
  ): Promise<boolean> {
    const user = await this.userService.activateAccount(userAccountActivateInput)

    await context.req.logout()
    context.req.logIn(user, (err) => {
      if (err) console.error(err)
    })

    return true
  }

  @Mutation()
  sendPasswordResetToken(@Args('email') email: string): Promise<boolean> {
    return this.userService.sendPasswordResetToken(email)
  }

  @Mutation()
  setPasswordFromPasswordResetToken(
    @Args('passwordResetInput') passwordResetInput: UserPasswordResetInput
  ): Promise<boolean> {
    return this.userService.setPasswordFromPasswordResetToken(passwordResetInput)
  }

  @Mutation()
  sendVerifyEmailToken(@Args('uuid') uuid: string): Promise<boolean> {
    return this.userService.sendVerifyEmailToken(uuid)
  }

  @Mutation()
  sendActivateAccountToken(@Args('uuid') uuid: string): Promise<boolean> {
    return this.userService.sendActivateAccountToken(uuid)
  }

  @Mutation()
  verifyEmail(
    @Args('userVerifyEmailInput') userVerifyEmailInput: UserVerifyEmailInput,
    @Context() context: IGraphQLContext
  ): Promise<boolean> {
    return this.userService.verifyEmail(userVerifyEmailInput)
  }
}

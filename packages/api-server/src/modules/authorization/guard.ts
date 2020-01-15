import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Reflector } from '@nestjs/core'
import { IQueryInfo } from 'accesscontrol'
import { InjectRolesBuilder, Role, RolesBuilder } from 'nest-access-control'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    return Promise.resolve(this.hasRoles(context))
  }

  hasRoles(context: ExecutionContext) {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler())
    if (!roles) return true

    const ctx = GqlExecutionContext.create(context).getContext()
    const user = ctx.user
    if (!user) throw new UnauthorizedException()

    return roles.every((role) => {
      const queryInfo: IQueryInfo = role
      queryInfo.role = user.roles
      const permission = this.roleBuilder.permission(role)

      return permission.granted
    })
  }
}

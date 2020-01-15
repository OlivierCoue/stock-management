import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    await request.logout()

    const canActivate = (await super.canActivate(context)) as boolean

    if (canActivate) await super.logIn(request)

    return canActivate
  }

  handleRequest(err: any, user: any, info: any, context: any) {
    return super.handleRequest(err, user, info, context)
  }
}

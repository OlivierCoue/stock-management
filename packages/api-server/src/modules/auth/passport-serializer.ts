import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportSerializer as BasePassportSerializer } from '@nestjs/passport'

import { UserService } from '../user/service'
import { AccountStatus } from '../../graphql/schema'

@Injectable()
export class PassportSerializer extends BasePassportSerializer {
  constructor(@Inject(forwardRef(() => UserService)) private readonly usersService: UserService) {
    super()
  }

  async deserializeUser(userId: any, done: Function) {
    const userRecord = await this.usersService.findOne({
      where: { id: userId, status: AccountStatus.ENABLED },
      relations: ['role', 'role.permissions'],
    })

    if (!userRecord) return done(new UnauthorizedException(), false)

    done(null, userRecord)
  }

  serializeUser(user: any, done: Function): any {
    done(null, user.id)
  }
}

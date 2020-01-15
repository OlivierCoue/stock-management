import { compare } from 'bcryptjs'
import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common'

import { UserService } from '../user/service'
import { AccountStatus } from '../../graphql/schema'

@Injectable()
export class AuthService {
  constructor(@Inject(forwardRef(() => UserService)) private readonly usersService: UserService) {}

  async login(email: string, password: string): Promise<any> {
    const userRecord = await this.usersService.findOne({ where: { email } })

    if (
      !userRecord ||
      userRecord.status !== AccountStatus.ENABLED ||
      !(await compare(password, userRecord.passwordHash))
    ) {
      throw new UnauthorizedException()
    }

    return userRecord
  }
}

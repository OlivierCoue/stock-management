import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common'

import { AuthService } from './service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(forwardRef(() => AuthService)) private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false,
    })
  }

  async validate(email: string, password: string, done: Function) {
    const user = await this.authService.login(email, password)

    if (!user) {
      done(new UnauthorizedException(), false)
    }

    done(null, user)
  }
}

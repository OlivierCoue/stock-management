import { Controller, Get, Next, Post, Req, Res, UseGuards } from '@nestjs/common'
import express from 'express'

import { CustomException } from '../../exceptions/custom-exception/exception'

import { LocalAuthGuard } from './local-auth-guard'

@Controller('auth')
export class AuthController {
  @Post('/login')
  @UseGuards(new LocalAuthGuard())
  public login(@Req() req: express.Request, @Res() res: express.Response, @Next() next: express.NextFunction) {
    if (req.user) {
      const { id, email, firstName, lastName } = req.user
      res.json({ id, email, firstName, lastName })
    } else {
      throw new CustomException('USER_NOT_IN_REQ')
    }
  }

  @Get('/logout')
  public async logout(@Req() req: express.Request, @Res() res: express.Response, @Next() next: express.NextFunction) {
    await req.logout()
    if (req.session) {
      await req.session.destroy(() => true)
    }

    res.json({ disconnected: true })
  }
}

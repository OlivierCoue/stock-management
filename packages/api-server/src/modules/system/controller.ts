import { Controller, Get, Next, Req, Res } from '@nestjs/common'
import express from 'express'

@Controller()
export class SystemController {
  @Get('/')
  public isOnline(@Req() req: express.Request, @Res() res: express.Response, @Next() next: express.NextFunction) {
    return res.json({ message: 'Hello, World!' })
  }
}

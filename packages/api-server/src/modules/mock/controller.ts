import { Controller, Next, Post, Req, Res } from '@nestjs/common'

import { env } from '../../env'

import { MockService } from './service'

@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  @Post('/create')
  public async createMock(@Req() req: any, @Res() res: any, @Next() next: any) {
    if (env.isLive) return false

    await this.mockService.createMock()

    return res.json({ started: true })
  }
}

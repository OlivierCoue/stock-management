import { Module } from '@nestjs/common'

import { MailerService } from '../../services'

@Module({
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}

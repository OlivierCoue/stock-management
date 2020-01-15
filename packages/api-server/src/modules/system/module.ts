import { Module } from '@nestjs/common'

import { SystemController } from './controller'

@Module({
  controllers: [SystemController],
})
export class SystemModule {}

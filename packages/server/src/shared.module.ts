import { Global, Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { BullModuleConfig, LoggerModule } from '~/common'

@Global()
@Module({
  imports: [
    BullModuleConfig,
    ScheduleModule.forRoot(),
    LoggerModule,
  ],
})
export class SharedModule {}

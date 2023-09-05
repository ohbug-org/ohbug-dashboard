import { Global, Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { DevtoolsModule } from '@nestjs/devtools-integration'
import { BullModuleConfig, LoggerModule } from '~/common'

@Global()
@Module({
  imports: [
    BullModuleConfig,
    ScheduleModule.forRoot(),
    LoggerModule,
    DevtoolsModule.register({ http: process.env.NODE_ENV !== 'production' }),
  ],
})
export class SharedModule {}

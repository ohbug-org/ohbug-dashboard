import { Global, Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { BullModuleConfig } from '~/common'

@Global()
@Module({ imports: [BullModuleConfig, ScheduleModule.forRoot()] })
export class SharedModule {}

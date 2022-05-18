import { Module } from '@nestjs/common'
import { ReportModule } from './report/report.module'
import { EventModule } from './event/event.module'

@Module({ imports: [ReportModule, EventModule] })
export class ApiModule {}

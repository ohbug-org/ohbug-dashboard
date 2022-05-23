import { Module } from '@nestjs/common'
import { ReportModule } from './report/report.module'

@Module({ imports: [ReportModule] })
export class ApiModule {}

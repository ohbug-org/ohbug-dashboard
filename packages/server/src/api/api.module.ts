import { Module } from '@nestjs/common'
import { AlertModule } from './alert/alert.module'
import { ReportModule } from './report/report.module'
import { SourceMapModule } from './source-map/source-map.module'

@Module({ imports: [AlertModule, ReportModule, SourceMapModule] })
export class ApiModule {}

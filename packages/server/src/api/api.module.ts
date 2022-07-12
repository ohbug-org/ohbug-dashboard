import { Module } from '@nestjs/common'
import { AlertModule } from './alert/alert.module'
import { ReportModule } from './report/report.module'
import { SourceMapModule } from './sourceMap/sourceMap.module'

@Module({ imports: [AlertModule, ReportModule, SourceMapModule] })
export class ApiModule {}

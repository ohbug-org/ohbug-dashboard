import { Module } from '@nestjs/common'
import { ReportModule } from './report/report.module'
import { SourceMapModule } from './sourceMap/sourceMap.module'

@Module({ imports: [ReportModule, SourceMapModule] })
export class ApiModule {}

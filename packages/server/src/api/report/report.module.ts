import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { ReportController } from './report.controller'
import { ReportService } from './report.service'
import { ReportProcessor } from './report.processor'
import { PrismaService } from '~/common'

@Module({
  imports: [
    BullModule.registerQueue({ name: 'document' }),
    BullModule.registerQueue({ name: 'alert' }),
  ],
  controllers: [ReportController],
  providers: [ReportService, ReportProcessor, PrismaService],
})
export class ReportModule {}

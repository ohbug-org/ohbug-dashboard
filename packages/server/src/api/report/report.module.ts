import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { ConfigService } from '@nestjs/config'
import { ReportController } from './report.controller'
import { ReportService } from './report.service'
import { ConfigModule } from '~/common'

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'document',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService: ConfigService) => {
        return ({ redis: configService.get('redis') })
      },
    }),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}

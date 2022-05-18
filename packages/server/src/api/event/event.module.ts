import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { ConfigService } from '@nestjs/config'
import { EventConsumer } from './event.processor'
import { ClickHouseModule, ConfigModule } from '~/common'

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'document',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService: ConfigService) => ({ redis: configService.get('redis') }),
    }),
    ClickHouseModule.forRoot({}),
  ],
  providers: [EventConsumer],
  exports: [],
})
export class EventModule {}

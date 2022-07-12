import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config'
import { AlertProcessor } from './alert.processor'
import { PrismaService } from '~/common'

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [AlertProcessor, PrismaService],
})
export class AlertModule {}

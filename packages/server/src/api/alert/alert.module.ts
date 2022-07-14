import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { AlertProcessor } from './alert.processor'
import { PrismaService } from '~/common'

@Module({
  imports: [HttpModule],
  providers: [AlertProcessor, PrismaService],
})
export class AlertModule {}

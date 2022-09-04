import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { SourceMapController } from './sourceMap.controller'
import { SourceMapService } from './sourceMap.service'
import { SourceMapProcessor } from './sourceMap.processor'
import { PrismaService } from '~/common'

@Module({
  imports: [BullModule.registerQueue({ name: 'sourceMap' })],
  controllers: [SourceMapController],
  providers: [SourceMapService, PrismaService, SourceMapProcessor],
})
export class SourceMapModule {}

import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { SourceMapController } from './source-map.controller'
import { SourceMapService } from './source-map.service'
import { SourceMapProcessor } from './source-map.processor'
import { PrismaService } from '~/common'

@Module({
  imports: [BullModule.registerQueue({ name: 'source-map' })],
  controllers: [SourceMapController],
  providers: [SourceMapService, PrismaService, SourceMapProcessor],
})
export class SourceMapModule {}

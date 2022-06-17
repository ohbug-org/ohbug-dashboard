import { Module } from '@nestjs/common'
import { SourceMapController } from './sourceMap.controller'
import { SourceMapService } from './sourceMap.service'
import { PrismaService } from '~/common'

@Module({
  controllers: [SourceMapController],
  providers: [SourceMapService, PrismaService],
})
export class SourceMapModule {}

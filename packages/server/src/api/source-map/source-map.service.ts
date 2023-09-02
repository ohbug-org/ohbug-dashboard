import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { type Queue } from 'bull'
import { type ReceiveSourceMapFile } from 'common'
import { type ReceiveSourceMapDto } from './source-map.dto'

@Injectable()
export class SourceMapService {
  constructor(@InjectQueue('sourceMap') private sourceMapQueue: Queue) {}

  async handleSourceMap(
    sourceMapFile: ReceiveSourceMapFile,
    body: ReceiveSourceMapDto,
  ) {
    await this.sourceMapQueue.add(
      'file',
      {
        sourceMapFile,
        body,
      },
      {
        delay: 3000,
        removeOnComplete: true,
        removeOnFail: true,
      },
    )
  }
}

import { Injectable } from '@nestjs/common'
import { ReceiveSourceMapFile } from 'common'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { ReceiveSourceMapDto } from './sourceMap.dto'

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

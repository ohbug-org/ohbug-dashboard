import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@webundsoehne/nest-fastify-file-upload'
import { ReceiveSourceMapFile } from 'types'
import { SourceMapService } from './sourceMap.service'
import { ReceiveSourceMapDto } from './sourceMap.dto'
import { UPLOAD_DEST } from './sourceMap.constant'

/**
 * 用于接受上报 SourceMap，经过处理后入库
 */
@Controller('sourceMap')
export class SourceMapController {
  constructor(private readonly sourceMapService: SourceMapService) {}

  /**
   * 接受上传的 sourceMap 文件和相关 app 信息并存储
   *
   * @param file sourceMap 文件相关信息
   * @param receiveSourceMapDto 此文件对应的 app 信息
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: UPLOAD_DEST }))
  async receiveSourceMap(
  @UploadedFile() file: ReceiveSourceMapFile,
    @Body() body: ReceiveSourceMapDto,
  ) {
    return this.sourceMapService.handleSourceMap(file, body)
  }
}

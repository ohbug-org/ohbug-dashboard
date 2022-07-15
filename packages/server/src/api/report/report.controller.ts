import { Body, Controller, Ip, Post } from '@nestjs/common'
import type { OhbugEvent } from '@ohbug/types'
import { ReportService } from './report.service'

/**
 * 用于接收上报数据
 * 唯一对外暴露的接口
 */
@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  /**
   * 上报接口 (Post)
   *
   * @param event 通过上报接口拿到的 event
   * @param ip
   * @param req
   */
  @Post()
  async receiveEventFromPost(@Body() event: OhbugEvent<any> | string, @Ip() ip: string) {
    return this.reportService.handleEvent(event, ip)
  }
}

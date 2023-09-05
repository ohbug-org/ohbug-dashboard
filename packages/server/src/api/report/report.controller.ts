import { Body, Controller, HttpCode, Ip, Post, Req } from '@nestjs/common'
import { OhbugEvent } from '@ohbug/types'
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
  @HttpCode(204)
  async receiveEventFromPost(@Body() event: OhbugEvent<any> | string, @Ip() ip: string, @Req() req: any) {
    this.reportService.handleEvent(event, req.headers?.['x-real-ip'] || req.headers?.['x-forwarded-for'] || ip)
  }
}

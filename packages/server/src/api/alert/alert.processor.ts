import { Process, Processor } from '@nestjs/bull'
import type { Job } from 'bull'
import { Action } from 'common'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { GetAlertStatusParams } from '../report/report.interface'
import { getAlertContent, getAlertStatus } from './alert.core'
import email from './email'
import webhook from './webhook'
import { ForbiddenException, PrismaService } from '~/common'

@Processor('alert')
export class AlertProcessor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Process()
  async handleAlert(job: Job) {
    try {
      const data = job.data as GetAlertStatusParams

      if (data) {
        const status = await getAlertStatus(data.event, data.issue, data.alerts, this.prisma)

        if (status.length) {
          for (const item of status) {
            if (item.alert) {
              const alertContent = getAlertContent(data.event, data.issue, item.alert)
              for (const action of item.alert.actions as unknown as Action[]) {
                if (action.type === 'email') {
                  const config = this.configService.get('service.email')
                  if (config?.host) {
                    email({
                      config,
                      to: action.uri,
                      title: alertContent.title,
                      text: alertContent.text,
                      html: alertContent.html,
                    })
                  }
                }
                else if (action.type === 'webhook') {
                  webhook(
                    {
                      title: alertContent.title,
                      text: alertContent.text,
                      markdown: alertContent.markdown,
                    },
                    action,
                    this.httpService,
                  )
                }
              }

              await this.prisma.alertEvent.create({
                data: {
                  alert: { connect: { id: item.alert.id } },
                  event: { connect: { id: data.event.id } },
                  issue: { connect: { id: data.issue.id } },
                },
              })
              await this.prisma.alert.update({
                where: { id: item.alert.id },
                data: { recentlyAt: new Date() },
              })
            }
          }
        }
      }
    }
    catch (error) {
      throw new ForbiddenException(4001005, error)
    }
  }
}

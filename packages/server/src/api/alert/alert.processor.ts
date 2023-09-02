import { OnQueueError, Process, Processor } from '@nestjs/bull'
import { getConfig } from 'config'
import { type Job } from 'bull'
import { type Action } from 'common'
import { type HttpService } from '@nestjs/axios'
import { type GetAlertStatusParams } from '../report/report.interface'
import { getAlertContent, getAlertStatus } from './alert.core'
import email from './email'
import webhook from './webhook'
import { type PrismaService } from '~/common'
import { ForbiddenException } from '~/common'

@Processor('alert')
export class AlertProcessor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  @Process()
  async handleAlert(job: Job) {
    try {
      const data = job.data as GetAlertStatusParams

      if (data) {
        const issueEventsCount = await this.prisma.event.count({ where: { issueId: data.issue.id } })
        const issueUsersCount = (await this.prisma.issue.findUniqueOrThrow({
          where: { id: data.issue.id },
          include: { users: true },
        })).users.length
        const status = await getAlertStatus(data.event, data.issue, issueEventsCount, data.alerts, this.prisma)

        if (status.length > 0) {
          for (const item of status) {
            if (item.alert) {
              const alertContent = getAlertContent(
                data.event,
                data.issue,
                issueEventsCount,
                issueUsersCount,
                item.alert,
              )
              for (const action of item.alert.actions as unknown as Action[]) {
                if (action.type === 'email') {
                  const config = getConfig()
                  if (config.email && config.email.server && config.email.from) {
                    email({
                      server: config.email.server,
                      from: config.email.from,
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
      throw new ForbiddenException(4001100, error)
    }
  }

  @OnQueueError()
  handleError(error: Error) {
    console.error(error)
  }
}

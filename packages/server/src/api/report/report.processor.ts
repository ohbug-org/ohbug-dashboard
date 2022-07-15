import { InjectQueue, OnQueueError, Process, Processor } from '@nestjs/bull'
import type { Job, Queue } from 'bull'
import type { Prisma } from '@prisma/client'
import type { CreateDataParams, GetAlertStatusParams } from './report.interface'
import { ForbiddenException, PrismaService } from '~/common'

@Processor('document')
export class ReportProcessor {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('alert') private alertQueue: Queue,
  ) {}

  async CreateData({
    event,
    issueIntro,
    userIntro,
    metadata,
  }: CreateDataParams) {
    try {
      const result = await this.prisma.event.create({
        data: {
          apiKey: event.apiKey,
          appVersion: event.appVersion,
          appType: event.appType,
          releaseStage: event.releaseStage,
          timestamp: event.timestamp,
          category: event.category,
          type: event.type,
          sdk: event.sdk as unknown as Prisma.InputJsonObject,
          detail: event.detail as Prisma.InputJsonValue,
          device: event.device as Prisma.InputJsonObject,
          user: event.user as Prisma.InputJsonObject,
          actions: event.actions as unknown as Prisma.InputJsonArray,
          metadata: event.metadata as Prisma.InputJsonObject,
          issue: {
            connectOrCreate: {
              where: { id: issueIntro },
              create: {
                id: issueIntro,
                apiKey: event.apiKey,
                type: event.type,
                metadata,
                users: {
                  connectOrCreate: {
                    where: {
                      issueId_eventUserId: {
                        issueId: issueIntro,
                        eventUserId: userIntro,
                      },
                    },
                    create: {
                      eventUser: {
                        connectOrCreate: {
                          where: { id: userIntro },
                          create: {
                            ...event.user,
                            id: userIntro,
                            ipAddress: event.user.ipAddress!,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        include: { issue: true },
      })
      const now = new Date()
      await this.prisma.issue.update({
        where: { id: issueIntro },
        data: { updatedAt: now },
      })
      await this.prisma.eventUser.update({
        where: { id: userIntro },
        data: { updatedAt: now },
      })
      return result
    }
    catch (error) {
      throw new ForbiddenException(400400, error)
    }
  }

  async findProjectByApiKey(apiKey: string) {
    try {
      return this.prisma.project.findUniqueOrThrow({
        where: { apiKey },
        include: { alerts: true },
      })
    }
    catch (error) {
      throw new ForbiddenException(400204, error)
    }
  }

  @Process('event')
  async handleEvent(job: Job) {
    try {
      const data = job.data as CreateDataParams

      if (data) {
        // 1. 查询有没有对应的 project
        const apiKey = data.event.apiKey
        const project = await this.findProjectByApiKey(apiKey)

        if (project) {
          // 2. 创建 issue/event (postgres)
          const event = await this.CreateData(data)

          // 3. 拿到对应的 alert 配置
          const alerts = project.alerts
          if (event && event.issue && alerts.length) {
            const getAlertStatusParams: GetAlertStatusParams = {
              event,
              issue: event.issue,
              alerts,
            }
            await this.alertQueue.add(getAlertStatusParams, {
              delay: 1000,
              removeOnComplete: true,
              removeOnFail: true,
              priority: 2,
            })
          }
        }
        else {
          throw new Error(`Project not found for apiKey: ${apiKey}`)
        }
      }
    }
    catch (error) {
      throw new ForbiddenException(4001004, error)
    }
  }

  @OnQueueError()
  handleError(error: Error) {
    console.error(error)
  }
}

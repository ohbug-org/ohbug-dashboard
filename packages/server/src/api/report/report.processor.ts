import { InjectQueue, OnQueueError, Process, Processor } from '@nestjs/bull'
import type { Job, Queue } from 'bull'
import type { Prisma } from '@prisma/client'
import type { CreateEventParams, CreateFeedbackParams, CreateMetricParams, CreateViewParams, GetAlertStatusParams } from './report.interface'
import { ForbiddenException, PrismaService } from '~/common'

@Processor('document')
export class ReportProcessor {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('alert') private alertQueue: Queue,
  ) {}

  async CreateEvent({
    event,
    issueIntro,
    userIntro,
    metadata,
  }: CreateEventParams) {
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
          metadata: event.metadata,
          issue: {
            connectOrCreate: {
              where: { id: issueIntro },
              create: {
                id: issueIntro,
                apiKey: event.apiKey,
                type: event.type,
                metadata: JSON.stringify(metadata),
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
      throw new ForbiddenException(4001003, error)
    }
  }

  async CreateMetric({ metric }: CreateMetricParams) {
    try {
      return this.prisma.metric.create({
        data: {
          apiKey: metric.apiKey,
          appVersion: metric.appVersion,
          appType: metric.appType,
          releaseStage: metric.releaseStage,
          timestamp: metric.timestamp,
          category: metric.category,
          type: metric.type,
          sdk: metric.sdk as unknown as Prisma.InputJsonObject,
          device: metric.device as Prisma.InputJsonObject,
          user: metric.user as Prisma.InputJsonObject,
          actions: metric.actions as unknown as Prisma.InputJsonArray,
          metadata: metric.metadata,
          CLS: metric.detail.CLS,
          FCP: metric.detail.FCP,
          FID: metric.detail.FID,
          LCP: metric.detail.LCP,
          TTFB: metric.detail.TTFB,
        },
      })
    }
    catch (error) {
      throw new ForbiddenException(4001004, error)
    }
  }

  async CreateFeedback({ feedback }: CreateFeedbackParams) {
    try {
      return this.prisma.feedback.create({
        data: {
          apiKey: feedback.apiKey,
          appVersion: feedback.appVersion,
          appType: feedback.appType,
          releaseStage: feedback.releaseStage,
          timestamp: feedback.timestamp,
          category: feedback.category,
          type: feedback.type,
          sdk: feedback.sdk as unknown as Prisma.InputJsonObject,
          detail: feedback.detail as Prisma.InputJsonValue,
          device: feedback.device as Prisma.InputJsonObject,
          user: feedback.user as Prisma.InputJsonObject,
          actions: feedback.actions as unknown as Prisma.InputJsonArray,
          metadata: feedback.metadata,
        },
      })
    }
    catch (error) {
      throw new ForbiddenException(4001005, error)
    }
  }

  async CreatePageView({ view }: CreateViewParams) {
    try {
      return this.prisma.pageView.create({
        data: {
          apiKey: view.apiKey,
          appVersion: view.appVersion,
          appType: view.appType,
          releaseStage: view.releaseStage,
          timestamp: view.timestamp,
          category: view.category,
          type: view.type,
          sdk: view.sdk as unknown as Prisma.InputJsonObject,
          device: view.device as Prisma.InputJsonObject,
          path: view.detail.path,
          user: view.user as Prisma.InputJsonObject,
          actions: view.actions as unknown as Prisma.InputJsonArray,
          metadata: view.metadata,
        },
      })
    }
    catch (error) {
      throw new ForbiddenException(4001006, error)
    }
  }

  async CreateUserView({ view }: CreateViewParams) {
    try {
      return this.prisma.userView.create({
        data: {
          apiKey: view.apiKey,
          appVersion: view.appVersion,
          appType: view.appType,
          releaseStage: view.releaseStage,
          timestamp: view.timestamp,
          category: view.category,
          type: view.type,
          sdk: view.sdk as unknown as Prisma.InputJsonObject,
          device: view.device as Prisma.InputJsonObject,
          path: view.detail.path,
          user: view.user as Prisma.InputJsonObject,
          actions: view.actions as unknown as Prisma.InputJsonArray,
          metadata: view.metadata,
        },
      })
    }
    catch (error) {
      throw new ForbiddenException(4001007, error)
    }
  }

  @Process('event')
  async handleEvent(job: Job) {
    try {
      const data = job.data as CreateEventParams

      if (data) {
        // 1. 查询有没有对应的 project
        const apiKey = data.event.apiKey
        const project = await this.prisma.project.findUniqueOrThrow({
          where: { apiKey },
          include: { alerts: true },
        })

        if (project) {
          // 2. 创建 issue/event (postgres)
          const event = await this.CreateEvent(data)

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
      throw new ForbiddenException(4001003, error)
    }
  }

  @Process('metric')
  async handleMetrics(job: Job) {
    try {
      const data = job.data as CreateMetricParams

      if (data) {
        const apiKey = data.metric.apiKey
        const project = await this.prisma.project.findUniqueOrThrow({ where: { apiKey } })

        if (project) {
          await this.CreateMetric(data)
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

  @Process('feedback')
  async handleFeedback(job: Job) {
    try {
      const data = job.data as CreateFeedbackParams

      if (data) {
        const apiKey = data.feedback.apiKey
        const project = await this.prisma.project.findUniqueOrThrow({ where: { apiKey } })

        if (project) {
          await this.CreateFeedback(data)
        }
        else {
          throw new Error(`Project not found for apiKey: ${apiKey}`)
        }
      }
    }
    catch (error) {
      throw new ForbiddenException(4001005, error)
    }
  }

  @Process('pageView')
  async handlePageView(job: Job) {
    try {
      const data = job.data as CreateViewParams

      if (data) {
        const apiKey = data.view.apiKey
        const project = await this.prisma.project.findUniqueOrThrow({ where: { apiKey } })

        if (project) {
          await this.CreatePageView(data)
        }
        else {
          throw new Error(`Project not found for apiKey: ${apiKey}`)
        }
      }
    }
    catch (error) {
      throw new ForbiddenException(4001006, error)
    }
  }

  @Process('userView')
  async handleUserView(job: Job) {
    try {
      const data = job.data as CreateViewParams

      if (data) {
        const apiKey = data.view.apiKey
        const project = await this.prisma.project.findUniqueOrThrow({ where: { apiKey } })

        if (project) {
          await this.CreateUserView(data)
        }
        else {
          throw new Error(`Project not found for apiKey: ${apiKey}`)
        }
      }
    }
    catch (error) {
      throw new ForbiddenException(4001007, error)
    }
  }

  @OnQueueError()
  handleError(error: Error) {
    console.error(error)
  }
}

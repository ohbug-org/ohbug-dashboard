import { Process, Processor } from '@nestjs/bull'
import type { Job } from 'bull'
import type { Prisma } from '@prisma/client'
import type { CreateDataParams } from './report.interface'
import { ForbiddenException, PrismaService } from '~/common'

@Processor('document')
export class ReportProcessor {
  constructor(private readonly prisma: PrismaService) {}

  async CreateData({
    event,
    issueIntro,
    userIntro,
    metaData,
  }: CreateDataParams) {
    try {
      return await this.prisma.event.create({
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
          metaData: event.metaData as Prisma.InputJsonObject,
          issue: {
            connectOrCreate: {
              where: { id: issueIntro },
              create: {
                id: issueIntro,
                apiKey: event.apiKey,
                type: event.type,
                metaData,
                users: {
                  connectOrCreate: {
                    where: {
                      issueId_userId: {
                        issueId: issueIntro,
                        userId: userIntro,
                      },
                    },
                    create: {
                      user: {
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
      })
    }
    catch (error) {
      throw new ForbiddenException(400400, error)
    }
  }

  /**
   * 对 event 进行任务调度
   * 1. 创建 issue/event (postgres)
   * 2. 根据 apiKey 拿到对应的 notification 配置
   * 3. 判断当前状态十分符合 notification 配置的要求，符合则通知 notifier 开始任务
   *
   * @param job
   */
  @Process('event')
  async handleEvent(job: Job) {
    try {
      const data = job.data as CreateDataParams

      if (data) {
        // 1. 创建 issue/event (postgres)
        await this.CreateData(data)

        // // 2. 根据 apiKey 拿到对应的 notification 配置
        // const notification = await getNotificationByApiKey(issue.apiKey)

        // // 3. 判断当前状态十分符合 notification 配置的要求，符合则通知 notifier 开始任务
        // const callback = async(result: {
        //   rule: any
        //   event: any
        //   issue: any
        // }) => {
        //   lastValueFrom(this.notifierClient.send(TOPIC_MANAGER_NOTIFIER_DISPATCH_NOTICE, {
        //     setting: notification.notificationSetting,
        //     rule: result.rule,
        //     event: result.event,
        //     issue: result.issue,
        //   }))
        // }
        // judgingStatus(event, issue, notification.notificationRules, callback)
      }
    }
    catch (error) {
      throw new ForbiddenException(4001004, error)
    }
  }
}

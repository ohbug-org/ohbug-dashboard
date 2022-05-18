import { Process, Processor } from '@nestjs/bull'
import { Inject } from '@nestjs/common'
import type { Job } from 'bull'
import { ClickHouseClient, ForbiddenException } from '~/common'
import type { OhbugEventLike } from '~/types'

@Processor('document')
export class EventConsumer {
  constructor(@Inject() private readonly clickHouseClient: ClickHouseClient) {}

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
      const data = job.data as {
        event: OhbugEventLike
        intro: string
        metadata: any
      }

      if (data)
        await this.clickHouseClient.insertPromise<OhbugEventLike>('event', [data.event])

      // const { event, intro, metadata } = data
      // // 1. 创建 issue/event (postgres)
      // const issue = await this.issueService.CreateOrUpdateIssueByIntro({
      //   event,
      //   intro,
      //   metadata,
      // })

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
    catch (error) {
      throw new ForbiddenException(4001004, error)
    }
  }
}

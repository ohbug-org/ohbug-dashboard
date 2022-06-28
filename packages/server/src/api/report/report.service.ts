import { Injectable } from '@nestjs/common'
import type { OhbugEvent } from '@ohbug/types'
import type { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import type { OhbugEventLike } from 'common'
import {
  getMd5FromAggregationData,
  switchErrorDetailAndGetAggregationDataAndMetaData,
} from './report.core'
import type { CreateDataParams } from './report.interface'
import { ForbiddenException } from '~/common'

@Injectable()
export class ReportService {
  constructor(@InjectQueue('document') private documentQueue: Queue) {}

  filterEvent(event: OhbugEvent<any>): OhbugEvent<any> {
    if (!('apiKey' in event && typeof event.apiKey === 'string'))
      throw new Error(`不合法的 Event 数据 收到 event.apiKey 为 ${event.apiKey}`)

    if ('appVersion' in event && typeof event.appVersion !== 'string')
      throw new Error(`不合法的 Event 数据 收到 event.appVersion 为 ${event.appVersion}`)

    if ('appType' in event && typeof event.appType !== 'string')
      throw new Error(`不合法的 Event 数据 收到 event.appType 为 ${event.appType}`)

    if ('releaseStage' in event && typeof event.releaseStage !== 'string')
      throw new Error(`不合法的 Event 数据 收到 event.releaseStage 为 ${event.releaseStage}`)

    if (!('timestamp' in event && typeof event.timestamp === 'string'))
      throw new Error(`不合法的 Event 数据 收到 event.timestamp 为 ${event.timestamp}`)

    if ('category' in event && typeof event.category !== 'string')
      throw new Error(`不合法的 Event 数据 收到 event.category 为 ${event.category}`)

    if (!('type' in event && typeof event.type === 'string'))
      throw new Error(`不合法的 Event 数据 收到 event.type 为 ${event.type}`)

    if (!('sdk' in event && event.sdk instanceof Object))
      throw new Error(`不合法的 Event 数据 收到 event.sdk 为 ${event.sdk}`)

    if (!('detail' in event))
      throw new Error('不合法的 Event 数据 缺少 event.detail')

    if (!('device' in event))
      throw new Error('不合法的 Event 数据 缺少 event.device')

    return event
  }

  /**
   * 补充 event 中的信息
   *
   * @param event
   * @param ipAddress
   */
  transferEvent(event: OhbugEvent<any>, ipAddress: string): OhbugEventLike {
    return Object.assign(event, {
      user: {
        ...(event.user ?? {}),
        ipAddress,
      },
    })
  }

  /**
   * 对 event 进行聚合 生成 issue intro
   * 根据堆栈信息进行 md5 加密得到 hash
   *
   * @param event
   */
  aggregation(event: OhbugEventLike) {
    try {
      const { type, detail, apiKey } = event
      const { agg, metadata }
        = switchErrorDetailAndGetAggregationDataAndMetaData(type, detail)
      const issueIntro = getMd5FromAggregationData(apiKey, ...agg)
      const userIntro = getMd5FromAggregationData(apiKey, ...Object.values(event.user))
      return { issueIntro, userIntro, metadata }
    }
    catch (error) {
      throw new ForbiddenException(4001001, error)
    }
  }

  /**
   * 对 event 进行预处理后传入 redis queues 等待进行下一步处理
   *
   * @param event 通过上报接口拿到的 event
   * @param ip 用户 ip
   */
  async handleEvent(event: OhbugEvent<any> | string, ip: string): Promise<void> {
    try {
      if (typeof event === 'string') event = JSON.parse(event)
      const filteredEvent = this.filterEvent(event as OhbugEvent<any>)
      const eventLike = this.transferEvent(filteredEvent, ip)
      const aggregationEvent = this.aggregation(eventLike)
      const createDataParams: CreateDataParams = {
        event: eventLike,
        ...aggregationEvent,
      }

      this.documentQueue.add(
        'event',
        createDataParams,
        {
          delay: 3000,
          removeOnComplete: true,
          removeOnFail: true,
        },
      )
    }
    catch (error) {
      throw new ForbiddenException(4001000, error)
    }
  }
}

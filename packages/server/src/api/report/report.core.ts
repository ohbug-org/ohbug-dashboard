import { EventTypes } from '@ohbug/core'

import type {
  AggregationDataAndMetaData,
  OhbugEventDetail,
} from './report.interface'
import { md5 } from '~/common'

/**
 * 根据不同 error detail 返回可用于聚合的字段
 *
 * @param type 具体的 error 类型
 * @param detail error detail
 */
export function switchErrorDetailAndGetAggregationDataAndMetaData(
  type: string,
  detail: OhbugEventDetail,
): AggregationDataAndMetaData {
  switch (type) {
    case EventTypes.UNCAUGHT_ERROR:
      return {
        agg: [
          detail.name,
          detail.message,
          detail.filename,
          detail.lineno,
          detail.colno,
          // detail.stack,
        ],
        metadata: {
          type,
          message: detail.message,
          filename: detail.filename,
          // others: detail.stack,
        },
      }
    case EventTypes.UNHANDLEDREJECTION_ERROR:
      return {
        agg: [detail.message],
        metadata: {
          type,
          message: detail.message,
        },
      }
    case EventTypes.UNKNOWN_ERROR:
      return {
        agg: [detail.message],
        metadata: {
          type,
          message: detail.message,
        },
      }
    case EventTypes.RESOURCE_ERROR:
      return {
        agg: [
          detail.outerHTML,
          detail.src,
          detail.tagName,
          detail.id,
          detail.className,
          detail.name,
          detail.nodeType,
          detail.selector,
        ],
        metadata: {
          type,
          message: detail.message,
          others: detail.selector,
        },
      }
    case EventTypes.AJAX_ERROR:
      return {
        agg: [detail.req?.url, detail.req?.method, detail.req?.data],
        metadata: {
          type,
          message: detail.req?.url,
          others: detail.req?.method,
        },
      }
    case EventTypes.FETCH_ERROR:
      return {
        agg: [detail.req?.url, detail.req?.method, detail.req?.data],
        metadata: {
          type,
          message: detail.req?.url,
          others: detail.req?.method,
        },
      }
    case EventTypes.WEBSOCKET_ERROR:
      return {
        agg: [detail.url],
        metadata: {
          type,
          message: detail.url,
        },
      }
    case EventTypes.REACT:
      return {
        agg: [
          detail.name,
          detail.message,
          detail.errorInfo,
          // detail.stack
        ],
        metadata: {
          type,
          message: detail.message,
          others: detail.errorInfo,
        },
      }
    case EventTypes.VUE:
      return {
        agg: [
          detail.name,
          detail.message,
          // detail.stack,
          detail.errorInfo,
          detail.component,
          detail.file,
          detail.props,
        ],
        metadata: {
          type,
          message: detail.message,
          filename: detail.file,
          others: detail.errorInfo,
        },
      }
    case EventTypes.MINIAPP_ERROR:
      return {
        agg: detail?.stack ? [detail.message, detail.stack] : [detail.message],
        metadata: {
          type,
          message: detail.message,
          stack: detail?.stack,
        },
      }
    case EventTypes.MINIAPP_UNHANDLEDREJECTION_ERROR:
      return {
        agg: detail?.stack ? [detail.message, detail.stack] : [detail.message],
        metadata: {
          type,
          message: detail.message,
          stack: detail?.stack,
        },
      }
    case EventTypes.MINIAPP_PAGENOTFOUND_ERROR:
      return {
        agg: [detail?.message, detail?.path, detail.query, detail.isEntryPage],
        metadata: {
          type,
          message: detail.message,
          path: detail.path,
          query: detail.query,
        },
      }
    case EventTypes.MINIAPP_MEMORYWARNING_ERROR:
      return {
        agg: [detail?.message, detail?.level],
        metadata: {
          type,
          message: detail.message,
          level: detail.level,
        },
      }
    case EventTypes.FEEDBACK:
      return {
        agg: [detail.feedback, detail.selector, detail.outerHTML],
        metadata: {
          type,
          message: detail.feedback,
          selector: detail.selector,
          outerHTML: detail.outerHTML,
        },
      }
    default:
      return {
        agg: [detail.message],
        metadata: {
          type,
          message: detail.message,
        },
      }
  }
}

/**
 * 对 AggregationData 进行 md5 加密拿到聚合依据
 *
 * @param aggregationData
 */
export function getMd5FromAggregationData(...aggregationData: any[]): string {
  const data = aggregationData.join(',')
  return md5(data)
}

import type {
  AjaxErrorDetail,
  FetchErrorDetail,
  ResourceErrorDetail,
  UncaughtErrorDetail,
  UnhandledrejectionErrorDetail,
  UnknownErrorDetail,
  WebsocketErrorDetail,
} from '@ohbug/browser'
import type { ReactErrorDetail } from '@ohbug/react'
import type { VueErrorDetail } from '@ohbug/vue'
import { Alert, Event, Issue, Prisma } from '@prisma/client'
import { OhbugEventLike } from 'common'

export type OhbugEventDetail = UncaughtErrorDetail &
UnhandledrejectionErrorDetail &
UnknownErrorDetail &
ResourceErrorDetail &
AjaxErrorDetail &
FetchErrorDetail &
WebsocketErrorDetail &
ReactErrorDetail &
VueErrorDetail &
any

export interface MetaData {
  type: string
  message: string
  filename?: string
  stack?: string
  others?: string
}
export interface AggregationDataAndMetaData {
  agg: any[]
  metadata: Prisma.InputJsonObject
}

export interface CreateEventParams {
  event: OhbugEventLike
  issueIntro: string
  userIntro: string
  metadata: Prisma.InputJsonObject
}

export interface CreateMetricParams {
  metric: OhbugEventLike
}

export interface GetAlertStatusParams {
  event: Event
  issue: Issue
  alerts: Alert[]
}

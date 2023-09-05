import {
  AjaxErrorDetail,
  FetchErrorDetail,
  ResourceErrorDetail,
  UncaughtErrorDetail,
  UnhandledrejectionErrorDetail,
  UnknownErrorDetail,
  WebsocketErrorDetail,
} from '@ohbug/browser'
import { ReactErrorDetail } from '@ohbug/react'
import { VueErrorDetail } from '@ohbug/vue'
import { OhbugEventLike } from 'common'
import { Alert, Event, Issue, Prisma } from '@prisma/client'

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
  userIntro: string
}

export interface CreateFeedbackParams {
  feedback: OhbugEventLike
  userIntro: string
}

export interface CreateViewParams {
  view: OhbugEventLike
  userIntro: string
}

export interface GetAlertStatusParams {
  event: Event
  issue: Issue
  alerts: Alert[]
}

import {
  type AjaxErrorDetail,
  type FetchErrorDetail,
  type ResourceErrorDetail,
  type UncaughtErrorDetail,
  type UnhandledrejectionErrorDetail,
  type UnknownErrorDetail,
  type WebsocketErrorDetail,
} from '@ohbug/browser'
import { type ReactErrorDetail } from '@ohbug/react'
import { type VueErrorDetail } from '@ohbug/vue'
import { type OhbugEventLike } from 'common'
import { type Alert, type Event, type Issue, type Prisma } from '@prisma/client'

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

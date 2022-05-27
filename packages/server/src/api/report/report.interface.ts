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
import { Prisma } from '@prisma/client'
import { OhbugEventLike } from '~/types'

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
  metaData: Prisma.InputJsonObject
}

export interface CreateOrUpdateIssueByIntroParams {
  event: OhbugEventLike
  intro: string
  metaData: Prisma.InputJsonObject
}
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
// @ts-expect-error ignore
import type { VueErrorDetail } from '@ohbug/vue'

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
  [key: string]: any
}
export interface AggregationDataAndMetaData {
  agg: any[]
  metadata: MetaData
}

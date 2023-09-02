import { type Alert } from '@prisma/client'
import { type AlertConditionTopic, type AlertFilterTopic, type FilterMatch } from '../topic'

export interface Action {
  type: 'email' | 'webhook'
  uri: string
  at?: string
  webhookType?: 'dingtalk' | 'wechatWork' | 'others'
}

export interface ConditionOption {
  topic: AlertConditionTopic
  name: string
  value?: string | number
  interval?: string
}

export interface FilterOption {
  topic: AlertFilterTopic
  name: string
  value?: string | number
  attribute?: string
  match?: FilterMatch
}

export type OmitAlert = Omit<Alert, 'id' | 'createdAt' | 'updatedAt' | 'actions'> & {
  actions: Action[]
  conditions: ConditionOption[]
  filters: FilterOption[]
}

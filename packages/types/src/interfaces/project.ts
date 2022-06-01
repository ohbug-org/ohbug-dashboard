import type { Extension } from './extension'
import type { NotificationRule, NotificationSetting } from './notification'

export interface ProjectTrend {
  'event.apiKey': string
  buckets: {
    timestamp: number
    count: number
  }[]
}
export interface Project {
  id?: number
  name: string
  type: string
  apiKey: string
  createdAt: Date
  updatedAt: Date
  notificationRules: NotificationRule[]
  notificationSetting: NotificationSetting
  extensions?: Extension[]
}

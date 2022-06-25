import type { Extension } from './extension'
import type { NotificationRule, NotificationSetting } from './notification'

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

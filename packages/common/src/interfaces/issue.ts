import type { OhbugReleaseStage } from '@ohbug/types'
import type { OhbugEventLike } from './event'

export interface MetaData {
  type: string
  message: string
  filename?: string
  stack?: string
  others?: string
}

export interface Issue {
  id: string
  apiKey: string
  appVersion?: string | null
  appType?: string | null
  releaseStage?: OhbugReleaseStage | null
  type: string
  metadata: string
  createdAt: Date
  updatedAt: Date
  _count?: {
    events: number
    users: number
  }
  events?: OhbugEventLike[]
}

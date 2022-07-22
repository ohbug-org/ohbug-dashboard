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

import { type OhbugEvent, type OhbugUser } from '@ohbug/types'
import { type Result } from 'source-map-trace'

export interface OhbugEventLike extends Omit<OhbugEvent<any>, 'user'> {
  id?: string
  user: OhbugUser
  createdAt?: Date
  issueId?: string
  source?: Result
}

export type { OhbugUser }

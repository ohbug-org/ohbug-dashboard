import type { OhbugEvent, OhbugUser } from '@ohbug/types'
import type { Result } from 'source-map-trace/dist/interfaces'

export interface OhbugEventLike extends Omit<OhbugEvent<any>, 'user'> {
  id?: string
  user: OhbugUser
  createdAt: Date
  issueId: string
}

export type { OhbugUser }
interface Document {
  id: string
  index: string
}
export interface EventInAPP<T> extends OhbugEvent<T> {
  // source
  source?: Result
  next?: Document
  previous?: Document
}

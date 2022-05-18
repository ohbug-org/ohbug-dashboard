import type { OhbugEvent, OhbugUser } from '@ohbug/types'
import type { Result } from 'source-map-trace/dist/interfaces'

export type OhbugEventLike = OhbugEvent<any>

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

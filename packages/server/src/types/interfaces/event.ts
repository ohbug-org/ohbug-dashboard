import type { OhbugEvent, OhbugUser } from '@ohbug/types'
import { Prisma } from '@prisma/client'
import type { Result } from 'source-map-trace/dist/interfaces'

export interface OhbugEventLike extends Omit<OhbugEvent<any>, 'sdk' | 'detail' | 'user' | 'actions' | 'metaData'> {
  sdk: Prisma.InputJsonObject
  detail: Prisma.InputJsonObject
  user: Prisma.InputJsonObject
  actions?: Prisma.InputJsonObject
  metaData?: Prisma.InputJsonObject
  intro: string
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

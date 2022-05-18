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

export interface GetEventByEventId {
  eventId: number
  issueId: number
}

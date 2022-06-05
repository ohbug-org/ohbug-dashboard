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
  metadata: MetaData
  createdAt: Date
  updatedAt: Date
  _count?: {
    events: number
    users: number
  }
}

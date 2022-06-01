export interface MetaData {
  type: string
  message: string
  filename?: string
  others?: string
}

export interface Issue {
  id?: string | number
  intro: string
  apiKey: string
  type: string
  createdAt: Date
  updatedAt: Date
  metadata: MetaData
  eventsCount: number
  usersCount: number
}

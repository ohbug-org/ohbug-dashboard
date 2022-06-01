export interface ReceiveSourceMapFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination?: string
  filename: string
  path: string
  size: number
}

export type SourceMapData = ReceiveSourceMapFile[]

export interface SourceMap {
  id?: number
  apiKey: string
  appVersion: string
  appType?: string
  data: SourceMapData
  createdAt: Date
  updatedAt: Date
}

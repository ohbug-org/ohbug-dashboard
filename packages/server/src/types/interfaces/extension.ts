export interface ExtensionRepository {
  type: string
  url: string
}

export interface ExtensionUI {
  name: string
  cdn: string
}

export interface Extension {
  id?: number
  name: string
  author: string
  logo: string
  description: string
  key: string
  verified: boolean
  repository: ExtensionRepository
  ui?: ExtensionUI
}

export interface ExtensionDetail extends Extension {
  readme: string
}

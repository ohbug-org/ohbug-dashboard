import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'
import * as yaml from 'js-yaml'

export interface Config {
  http: {
    url: string
  }
  db: {
    postgres: {
      host: string
      port: number
      database: string
      user: string
      password: string
      url: string
    }
  }
  secret?: {
    apikey?: string
    session?: string
  }
  oauth?: {
    github: {
      clientId: string
      clientSecret: string
    }
  }
  email?: {
    server: {
      host: string
      port: number
      auth: {

        user: string
        pass: string
      }
    }
    from: string
  }
}
const YAML_CONFIG_FILENAME = 'ohbug.config.yml'
const DEVELOP_YAML_CONFIG_FILENAME = 'ohbug.config.development.yml'
export function getConfig(): Config {
  const configPath = join(cwd(), '../../', process.env.NODE_ENV === 'development' ? DEVELOP_YAML_CONFIG_FILENAME : YAML_CONFIG_FILENAME)
  const config = yaml.load(readFileSync(configPath, 'utf8')) as Config
  const postgresUrl = `postgresql://${config.db.postgres.user}:${config.db.postgres.password}@${config.db.postgres.host}:${config.db.postgres.port}/${config.db.postgres.database}`
  config.db.postgres.url = postgresUrl
  return config
}

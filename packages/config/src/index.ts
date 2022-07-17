import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'
import * as yaml from 'js-yaml'

export interface Config {
  db: {
    postgres: {
      host: string
      port: number
      database: string
      user: string
      password: string
      url: string
    }
    redis: {
      host: string
      port: number
    }
  }
  secret?: {
    session?: string
    apikey?: string
    nextauth?: string
  }
}
const YAML_CONFIG_FILENAME = 'ohbug.config.yml'
export function getConfig(): Config {
  const configPath = join(cwd(), '../../', YAML_CONFIG_FILENAME)
  const config = yaml.load(readFileSync(configPath, 'utf8')) as Config
  const postgresUrl = `postgresql://${config.db.postgres.user}:${config.db.postgres.password}@${config.db.postgres.host}:${config.db.postgres.port}/${config.db.postgres.database}`
  config.db.postgres.url = postgresUrl
  return config
}

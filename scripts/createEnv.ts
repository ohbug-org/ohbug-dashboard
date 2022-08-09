import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { cwd } from 'node:process'
import * as yaml from 'js-yaml'
import pkg from '../package.json'
import type { Config } from '../packages/config'

const YAML_CONFIG_FILENAME = 'ohbug.config.yml'
const DEVELOP_YAML_CONFIG_FILENAME = 'ohbug.config.development.yml'
const FILE_NAME = '.env'

async function main() {
  const rootFilePath = join(cwd(), FILE_NAME)
  const webFilePath = join(cwd(), 'packages/web', FILE_NAME)
  const configPath = join(cwd(), process.env.NODE_ENV === 'development' ? DEVELOP_YAML_CONFIG_FILENAME : YAML_CONFIG_FILENAME)
  const config = yaml.load(await readFile(configPath, 'utf8')) as Config

  const fileContents = `NEXT_PUBLIC_VERSION=${pkg.version}
DB_USER=${config.db.postgres.user}
DB_PASSWORD=${config.db.postgres.password}
DB_NAME=${config.db.postgres.database}
DATABASE_URL="postgresql://${config.db.postgres.user}:${config.db.postgres.password}@${config.db.postgres.host}:${config.db.postgres.port}/${config.db.postgres.database}"
NEXTAUTH_URL=${config.http.url}
NEXT_PUBLIC_NEXTAUTH_URL=${config.http.url}
`
  await writeFile(rootFilePath, fileContents)
  await writeFile(webFilePath, fileContents)
}

main()

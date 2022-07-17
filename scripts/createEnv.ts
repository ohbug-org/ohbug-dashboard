import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { cwd } from 'node:process'
import * as yaml from 'js-yaml'
import type { Config } from '../packages/config'

const YAML_CONFIG_FILENAME = 'ohbug.config.yml'
const FILE_NAME = '.env'

async function main() {
  const filePath = join(cwd(), FILE_NAME)
  const configPath = join(cwd(), YAML_CONFIG_FILENAME)
  const config = yaml.load(await readFile(configPath, 'utf8')) as Config

  const fileContents = `DB_USER=${config.db.postgres.user}
DB_PASSWORD=${config.db.postgres.password}
DB_NAME=${config.db.postgres.database}
DATABASE_URL="postgresql://${config.db.postgres.user}:${config.db.postgres.password}@${config.db.postgres.host}:${config.db.postgres.port}/${config.db.postgres.database}"
`
  await writeFile(filePath, fileContents)
}

main()

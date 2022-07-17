import { PrismaClient } from '@prisma/client'
import { getConfig } from 'config'

declare global {
  // eslint-disable-next-line vars-on-top,no-var
  var __db__: PrismaClient
}

function getClient() {
  const databaseUrl = new URL(getConfig().db.postgres.url)

  const isLocalHost = databaseUrl.hostname === 'localhost'

  const PRIMARY_REGION = isLocalHost ? null : process.env.PRIMARY_REGION

  const isReadReplicaRegion = !PRIMARY_REGION

  if (!isLocalHost) {
    databaseUrl.host = `${databaseUrl.host}`
    if (!isReadReplicaRegion) { databaseUrl.port = '5432' }
  }

  console.warn(`🔌 setting up prisma client to ${databaseUrl.host}`)
  // NOTE: during development if you change anything in this function, remember
  // that this only runs once per server restart and won't automatically be
  // re-run per request like everything else is. So if you need to change
  // something in this file, you'll need to manually restart the server.
  const client = new PrismaClient({ datasources: { db: { url: databaseUrl.toString() } } })
  // connect eagerly
  client.$connect()

  return client
}

export function getPrisma() {
  if (!global.__db__) {
    global.__db__ = getClient()
  }

  return global.__db__
}

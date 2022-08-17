import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line vars-on-top,no-var
  var __db__: PrismaClient
}

/**
 * server
 */
function createClient() {
  const databaseUrl = new URL(process.env.DATABASE_URL)

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

/**
 * client
 */
function handleFetch(link: any[]) {
  const isOperate = link.length === 3
  const isMethod = link.length === 2
  let table = ''
  let operate = ''
  let method = ''
  let data = ''
  if (isOperate) {
    table = link[0]
    operate = link[1]
    data = link[2]
    const body = {
      operate,
      data,
    }
    return fetch(
      `/api/prisma/${table}`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      },
    )
      .then(res => res.json())
      .then((res) => {
        if (res.success) {
          return res.data
        }
        throw new Error(res.errorMessage)
      })
  }
  else if (isMethod) {
    method = link[0]
    data = link[1]
    const body = { data }
    return fetch(
      `/api/prisma/${method}`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      },
    )
      .then(res => res.json())
      .then((res) => {
        if (res.success) {
          return res.data
        }
        throw new Error(res.errorMessage)
      })
  }
}
const operates = [
  'findUnique',
  'findUniqueOrThrow',
  'findFirst',
  'findFirstOrThrow',
  'findMany',
  'create',
  'update',
  'upsert',
  'delete',
  'createMany',
  'updateMany',
  'deleteMany',
  'count',
  'aggregate',
  'groupBy',

]
const methods = [
  '$queryRaw',
  '$queryRawUnsafe',
]
function createProxy<T extends Object>(target: T, tempLink: any[] = []): T {
  return new Proxy(target, {
    get(_target, prop: string) {
      if (!prop.includes('$')) {
        tempLink.push(prop)
      }
      if (operates.includes(prop)) {
        return async(args: any) => {
          tempLink.push(args)
          const result = await handleFetch(tempLink)
          tempLink.length = 0
          return result
        }
      }
      if (methods.includes(prop)) {
        tempLink.push(prop)
        return async(args: any) => {
          tempLink.push(args)
          const result = await handleFetch(tempLink)
          tempLink.length = 0
          return result
        }
      }
      return createProxy<T>({} as T, tempLink)
    },
  })
}

export function getPrisma() {
  if (typeof window === 'undefined') {
    if (!global.__db__) {
      global.__db__ = createClient()
    }
    return global.__db__
  }
  const tempLink: any[] = []
  return createProxy({} as PrismaClient, tempLink)
}

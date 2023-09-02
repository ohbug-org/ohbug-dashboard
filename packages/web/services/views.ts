import { type Prisma } from '@prisma/client'
import { getPrisma } from '~/db'

interface serviceGetUserViewParams {
  apiKey: string
  expirationDate?: Date
  startDate?: Date
}
export function serviceGetUserView({ apiKey, expirationDate = new Date(), startDate }: serviceGetUserViewParams) {
  const options: Prisma.UserViewCountArgs = {
    where: {
      apiKey,
      createdAt: { lte: expirationDate },
    },
  }
  if (startDate) {
    (options.where!.createdAt as Prisma.DateTimeFilter).gte = startDate
  }
  return getPrisma().userView.count(options)
}

interface serviceGetPageViewParams {
  apiKey: string
  expirationDate?: Date
  startDate?: Date
}
export function serviceGetPageView({ apiKey, expirationDate = new Date(), startDate }: serviceGetPageViewParams) {
  const options: Prisma.PageViewCountArgs = {
    where: {
      apiKey,
      createdAt: { lte: expirationDate },
    },
  }
  if (startDate) {
    (options.where!.createdAt as Prisma.DateTimeFilter).gte = startDate
  }
  return getPrisma().pageView.count(options)
}

export type PVGroupResult = { value: string; count: number }[]
interface serviceGetPVPathGroupResultParams {
  apiKey: string
}
export function serviceGetPVPathGroupResult({ apiKey }: serviceGetPVPathGroupResultParams) {
  return getPrisma().$queryRaw<PVGroupResult>`
SELECT ("PageView"."device" -> 'url') AS value, count("PageView"."device" -> 'url')::int AS count
FROM "PageView"
WHERE "PageView"."apiKey" = ${apiKey}
GROUP BY value
ORDER BY value ASC
LIMIT 10;
`
}

interface serviceGetPVReferrerGroupResultParams {
  apiKey: string
}
export function serviceGetPVReferrerGroupResult({ apiKey }: serviceGetPVReferrerGroupResultParams) {
  return getPrisma().$queryRaw<PVGroupResult>`
SELECT ("PageView"."device" -> 'referrer') AS value, count("PageView"."device" -> 'referrer')::int AS count
FROM "PageView"
WHERE "PageView"."apiKey" = ${apiKey}
GROUP BY value
ORDER BY value ASC
LIMIT 10;
`
}

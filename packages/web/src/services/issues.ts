import dayjs from 'dayjs'
import { prisma } from '~/db'

interface ServiceGetIssuesParams {
  skip: number
  take: number
}
export function serviceGetIssues({ skip = 0, take = 100 }: ServiceGetIssuesParams) {
  return prisma.issue.findMany({
    skip,
    take,
    include: {
      _count: {
        select: {
          events: true,
          users: true,
        },
      },
    },
  })
}

interface ServiceGetIssuesTrendsParams {
  ids: string
  type: '24h' | '14d'
}
export interface IssueTrend {
  issueId: string
  time: string
  count: number
}
export type serviceGetIssuesTrendsReturn = Record<string, IssueTrend[]>
export async function serviceGetIssuesTrends({ ids, type }: ServiceGetIssuesTrendsParams) {
  const format = type === '14d' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH'
  const unit = type === '14d' ? 'day' : 'hour'
  const interval = type === '14d' ? 14 : 24
  const max = dayjs()
  const min = max.subtract(interval, unit)

  const list = `(${ids.split(',').map(v => `'${v}'`).join(',')})`
  const trends = await prisma.$queryRawUnsafe<IssueTrend[]>(`
    SELECT "issueId", to_char("Event"."createdAt", '${format}') AS time, count("Event".*)
    FROM "Event"
    WHERE "Event"."issueId" IN ${list}
    AND "Event"."createdAt" BETWEEN '${min.format('YYYY-MM-DD HH:mm:ss')}' AND '${max.format('YYYY-MM-DD HH:mm:ss')}'
    GROUP BY time, "issueId"
    order by "issueId"
  `)

  return ids.split(',').reduce<serviceGetIssuesTrendsReturn>((acc, issueId) => {
    acc[issueId] = Array.from(new Array(interval + 1)).map((_, index) => {
      const time = dayjs(min).add(index, unit).format(format)
      const match = trends.find(v => (v.time === time) && (v.issueId === issueId))
      if (match) return match
      return {
        issueId,
        time,
        count: 0,
      }
    })
    return acc
  }, {})
}

interface ServiceGetIssueParams {
  id: string
  withEvents?: boolean
}
export function serviceGetIssue({ id, withEvents }: ServiceGetIssueParams) {
  return prisma.issue.findUnique({
    where: { id },
    include: {
      events: withEvents,
      _count: {
        select: {
          events: true,
          users: true,
        },
      },
    },
  })
}

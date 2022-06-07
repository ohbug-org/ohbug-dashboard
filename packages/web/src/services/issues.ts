import { prisma } from '~/db'

interface serviceGetIssuesParams {
  skip: number
  take: number
}
export function serviceGetIssues({ skip = 0, take = 100 }: serviceGetIssuesParams) {
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

interface serviceGetIssuesTrendsParams {
  ids: string
  type: '24h' | '14d'
}
export type serviceGetIssuesTrendsReturn = {
  issueId: string
  time: string
  count: number
}[]
export function serviceGetIssuesTrends({ ids, type }: serviceGetIssuesTrendsParams) {
  const format = type === '14d' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH24'
  const list = `(${ids})`

  return prisma.$queryRawUnsafe<serviceGetIssuesTrendsReturn[]>(`
    SELECT "issueId", to_char("Event"."createdAt", '${format}') AS time, count("Event".*)
    FROM "Event"
    WHERE "Event"."issueId" IN ${list}
    GROUP BY time, "issueId"
    order by "issueId"
  `)
}

interface serviceGetIssueParams {
  id: string
}
export function serviceGetIssue({ id }: serviceGetIssueParams) {
  return prisma.issue.findUnique({ where: { id } })
}

import dayjs from 'dayjs'
import type { Pagination } from 'common'
import { PAGE_SIZE, pagination } from 'common'
import { serviceGetProject } from './projects'
import { getPrisma } from '~/db'

interface ServiceGetIssuesParams extends Pagination {
  projectId: number
  query?: string
}
export async function serviceGetIssues({ projectId, query, page = 0, pageSize = PAGE_SIZE }: ServiceGetIssuesParams) {
  const project = await serviceGetProject(projectId)
  const options: any = {
    where: { apiKey: project.apiKey },
    ...pagination({ page, pageSize }),
    include: {
      _count: {
        select: {
          events: true,
          users: true,
        },
      },
    },
  }
  if (query) {
    options.where.metadata = { search: query }
  }
  return getPrisma().$transaction([
    getPrisma().issue.findMany(options),
    getPrisma().issue.count({ where: { apiKey: project.apiKey } }),
  ])
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
  const trends = await getPrisma().$queryRawUnsafe<IssueTrend[]>(`
    SELECT "issueId", to_char("Event"."createdAt", '${format}') AS time, count("Event".*)::int
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
}
export function serviceGetIssue({ id }: ServiceGetIssueParams) {
  return getPrisma().issue.findUniqueOrThrow({
    where: { id },
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

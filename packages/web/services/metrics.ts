import dayjs from 'dayjs'
import { type MetricType } from 'common'
import { getPrisma } from '~/db'

interface ServiceGetMetricsTrendsParams {
  projectId: number
  type: '24h' | '14d'
  metric: MetricType
}
export interface MetricsTrend {
  time: string
  value: number
}
const metrics: MetricType[] = ['CLS', 'FID', 'LCP', 'INP', 'FCP', 'TTFB']
export async function serviceGetMetricsTrends({ projectId, type, metric }: ServiceGetMetricsTrendsParams) {
  if (!metrics.includes(metric)) return []

  const format = type === '14d' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH'
  const unit = type === '14d' ? 'day' : 'hour'
  const interval = type === '14d' ? 14 : 24
  const max = dayjs()
  const min = max.subtract(interval, unit)

  const trends = (await getPrisma().$queryRawUnsafe<MetricsTrend[]>(`
    SELECT to_char("Metric"."createdAt", '${format}') AS time, avg("${metric}") as value
    FROM "Metric"
    LEFT JOIN "Project" ON "Project"."apiKey" = "Metric"."apiKey"
    WHERE "Project"."id" = ${projectId}
    AND "Metric"."createdAt" BETWEEN '${min.format('YYYY-MM-DD HH:mm:ss')}' AND '${max.format('YYYY-MM-DD HH:mm:ss')}'
    GROUP BY time
    order by time
  `)).map(v => ({
    ...v,
    time: dayjs(v.time).utc().tz(dayjs.tz.guess()).format(format),
  }))

  return Array.from(Array.from({ length: interval + 1 })).map((_, index) => {
    const time = dayjs(min).add(index, unit).format(format)
    const match = trends.find(v => (v.time === time))
    if (match) return match
    return {
      time,
      value: 0,
    }
  })
}

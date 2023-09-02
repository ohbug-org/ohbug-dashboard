import { pagination } from 'common'
import dayjs from 'dayjs'
import { type Prisma } from '@prisma/client'
import { type OmitAlert, type Pagination } from 'common'
import { getPrisma } from '~/db'

export function serviceCreateAlert({ projectId, ...alert }: OmitAlert) {
  return getPrisma().alert.create({
    data: {
      name: alert.name,
      releaseStage: alert.releaseStage,
      level: alert.level,
      interval: alert.interval,
      enabled: true,
      actions: alert.actions as unknown as Prisma.InputJsonArray,
      conditions: alert.conditions,
      filters: alert.filters,
      conditionMatch: alert.conditionMatch,
      filterMatch: alert.filterMatch,
      project: { connect: { id: projectId } },
    },
  })
}

interface ServiceGetAlertsParams extends Pagination {
  projectId: number
}
export function serviceGetAlerts({ page, pageSize, projectId }: ServiceGetAlertsParams) {
  return getPrisma().alert.findMany({
    where: { projectId },
    ...pagination({ page, pageSize }),
    orderBy: { updatedAt: 'desc' },
  })
}

interface ServiceGetReleaseParams {
  id: number
}
export function serviceGetAlert({ id }: ServiceGetReleaseParams) {
  return getPrisma().alert.findUniqueOrThrow({ where: { id } })
}

export function serviceDeleteAlert({ id }: ServiceGetReleaseParams) {
  return getPrisma().alert.delete({ where: { id } })
}

export function serviceUpdateAlert(id: number, data: OmitAlert) {
  return getPrisma().alert.update({
    where: { id },
    data: {
      ...data,
      actions: data.actions as unknown as Prisma.InputJsonArray,
    },
  })
}

export function serviceGetAlertEvents(alertId: number) {
  return getPrisma().alertEvent.findMany({
    where: { alertId },
    include: {
      event: true,
      issue: true,
    },
    orderBy: { createdAt: 'desc' },
  })
}

interface ServiceGetAlertEventTrendsParams {
  id: number
  type: '24h' | '14d'
}
export interface AlertEventTrend {
  time: string
  count: number
}
export async function serviceGetAlertEventTrends({ id, type }: ServiceGetAlertEventTrendsParams) {
  const format = type === '14d' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH'
  const unit = type === '14d' ? 'day' : 'hour'
  const interval = type === '14d' ? 14 : 24
  const max = dayjs()
  const min = max.subtract(interval, unit)

  const trends = (await getPrisma().$queryRawUnsafe<AlertEventTrend[]>(`
    SELECT to_char("AlertEvent"."createdAt", '${format}') AS time, count("AlertEvent".*)::int
    FROM "AlertEvent"
    WHERE "AlertEvent"."alertId" = ${id}
    AND "AlertEvent"."createdAt" BETWEEN '${min.format('YYYY-MM-DD HH:mm:ss')}' AND '${max.format('YYYY-MM-DD HH:mm:ss')}'
    GROUP BY time
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
      count: 0,
    }
  })
}

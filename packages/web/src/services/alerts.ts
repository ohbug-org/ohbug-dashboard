import type { Prisma } from '@prisma/client'
import type { OmitAlert, Pagination } from 'common'
import { pagination } from 'common'
import dayjs from 'dayjs'
import { prisma } from '~/db'

export function serviceCreateAlert({ projectId, ...alert }: OmitAlert) {
  return prisma.alert.create({
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
  return prisma.alert.findMany({
    where: { projectId },
    ...pagination({ page, pageSize }),
  })
}

interface ServiceGetReleaseParams {
  id: number
}
export function serviceGetAlert({ id }: ServiceGetReleaseParams) {
  return prisma.alert.findUniqueOrThrow({ where: { id } })
}

export function serviceUpdateAlert(id: number, data: OmitAlert) {
  return prisma.alert.update({
    where: { id },
    data: {
      ...data,
      actions: data.actions as unknown as Prisma.InputJsonArray,
    },
  })
}

export function serviceGetAlertEvents(alertId: number) {
  return prisma.alertEvent.findMany({
    where: { alertId },
    include: {
      event: true,
      issue: true,
    },
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

  const trends = await prisma.$queryRawUnsafe<AlertEventTrend[]>(`
    SELECT to_char("AlertEvent"."createdAt", '${format}') AS time, count("AlertEvent".*)::int
    FROM "AlertEvent"
    WHERE "AlertEvent"."alertId" = ${id}
    AND "AlertEvent"."createdAt" BETWEEN '${min.format('YYYY-MM-DD HH:mm:ss')}' AND '${max.format('YYYY-MM-DD HH:mm:ss')}'
    GROUP BY time
  `)

  return Array.from(new Array(interval + 1)).map((_, index) => {
    const time = dayjs(min).add(index, unit).format(format)
    const match = trends.find(v => (v.time === time))
    if (match) return match
    return {
      time,
      count: 0,
    }
  })
}

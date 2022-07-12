import type { Prisma } from '@prisma/client'
import type { OmitAlert, Pagination } from 'common'
import { pagination } from 'common'
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

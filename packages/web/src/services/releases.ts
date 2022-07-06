import type { Pagination } from 'common'
import { pagination } from 'common'
import { prisma } from '~/db'

interface ServiceGetReleasesParams extends Pagination {
  projectId: number
}
export function serviceGetReleases({ page, pageSize, projectId }: ServiceGetReleasesParams) {
  return prisma.release.findMany({
    where: { projectId },
    ...pagination({ page, pageSize }),
  })
}

interface ServiceGetReleaseParams {
  id: number
}
export function serviceGetRelease({ id }: ServiceGetReleaseParams) {
  return prisma.release.findUniqueOrThrow({ where: { id } })
}

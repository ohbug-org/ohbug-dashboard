import type { Pagination } from 'common'
import { pagination } from 'common'
import { getPrisma } from '~/db'

interface ServiceGetReleasesParams extends Pagination {
  projectId: number
}
export function serviceGetReleases({ page, pageSize, projectId }: ServiceGetReleasesParams) {
  return getPrisma().release.findMany({
    where: { projectId },
    ...pagination({ page, pageSize }),
    orderBy: { updatedAt: 'desc' },
  })
}

interface ServiceGetReleaseParams {
  id: number
}
export function serviceGetRelease({ id }: ServiceGetReleaseParams) {
  return getPrisma().release.findUniqueOrThrow({ where: { id } })
}

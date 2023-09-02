import { pagination } from 'common'
import { type Prisma } from '@prisma/client'
import { type Pagination } from 'common'
import { getPrisma } from '~/db'
import { getFs } from '~/fs'

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

export async function serviceDeleteRelease({ id }: ServiceGetReleaseParams) {
  const release = await getPrisma().release.findUniqueOrThrow({ where: { id } })
  const sourceMaps = release.sourceMaps as Prisma.JsonArray
  try {
    if (Array.isArray(sourceMaps)) {
      for (const sourceMap of sourceMaps) {
        if (typeof sourceMap === 'object' && 'path' in sourceMap!) {
          await getFs().unlink(sourceMap.path as string)
        }
      }
    }
  }
  catch {}
  return getPrisma().release.delete({ where: { id } })
}

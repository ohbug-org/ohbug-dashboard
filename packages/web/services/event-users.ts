import { PAGE_SIZE, pagination } from 'common'
import { type Pagination } from 'common'
import { getPrisma } from '~/db'

interface ServiceGetEventUsersParams extends Pagination {
  projectId: number
  query?: string
}
export async function serviceGetEventUsers({
  projectId,
  page = 0,
  pageSize = PAGE_SIZE,
  query,
}: ServiceGetEventUsersParams) {
  const project = await getPrisma().project.findUniqueOrThrow({ where: { id: projectId } })
  return getPrisma().eventUser.findMany({
    where: {
      projects: { every: { apiKey: project.apiKey } },
      ipAddress: query ? { search: query } : undefined,
      uuid: query ? { search: query } : undefined,
      email: query ? { search: query } : undefined,
      name: query ? { search: query } : undefined,
      metadata: query ? { search: query } : undefined,
    },
    ...pagination({ page, pageSize }),
    include: {
      _count: {
        select: {
          issues: true,
          metrics: true,
          feedbacks: true,
          pageViews: true,
          userViews: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

interface ServiceGetEventUserParams {
  id: string
}
export function serviceGetEventUser({ id }: ServiceGetEventUserParams) {
  return getPrisma().eventUser.findUniqueOrThrow({
    where: { id },
    include: {
      events: { take: 10 },
      feedbacks: { take: 10 },
    },
  })
}

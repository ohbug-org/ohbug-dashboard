import type { Pagination } from 'common'
import { PAGE_SIZE, pagination } from 'common'
import { getPrisma } from '~/db'

interface ServiceGetEventUsersParams extends Pagination {
  projectId: number
}
export async function serviceGetEventUsers({
  projectId,
  page = 0,
  pageSize = PAGE_SIZE,
}: ServiceGetEventUsersParams) {
  const project = await getPrisma().project.findUniqueOrThrow({ where: { id: projectId } })
  return getPrisma().eventUser.findMany({
    where: { projects: { every: { apiKey: project.apiKey } } },
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

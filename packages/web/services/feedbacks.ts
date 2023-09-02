import { PAGE_SIZE, pagination } from 'common'
import { type Pagination } from 'common'
import { serviceGetProject } from './projects'
import { getPrisma } from '~/db'

interface ServiceGetFeedbacksParams extends Pagination {
  projectId: number
}
export async function serviceGetFeedbacks({
  projectId,
  page = 0,
  pageSize = PAGE_SIZE,
}: ServiceGetFeedbacksParams) {
  const project = await serviceGetProject(projectId)
  return getPrisma().feedback.findMany({
    where: { apiKey: project.apiKey },
    ...pagination({ page, pageSize }),
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  })
}

interface ServiceGetFeedbackParams {
  id: string
}
export function serviceGetFeedback({ id }: ServiceGetFeedbackParams) {
  return getPrisma().feedback.findUniqueOrThrow({
    where: { id },
    include: { user: true },
  })
}

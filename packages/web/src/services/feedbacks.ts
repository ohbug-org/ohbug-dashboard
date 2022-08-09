import type { Pagination } from 'common'
import { PAGE_SIZE, pagination } from 'common'
import { serviceGetProject } from './projects'
import { getPrisma } from '~/db'

interface ServiceGetFeedbacksParams extends Pagination {
  projectId: number
  query?: string
}
export async function serviceGetFeedbacks({
  projectId,
  query,
  page = 0,
  pageSize = PAGE_SIZE,
}: ServiceGetFeedbacksParams) {
  const project = await serviceGetProject(projectId)
  const options: any = {
    where: { apiKey: project.apiKey },
    ...pagination({ page, pageSize }),
  }
  if (query) {
    options.where.metadata = { search: query }
  }
  return getPrisma().feedback.findMany(options)
}

interface ServiceGetFeedbackParams {
  id: string
}
export function serviceGetFeedback({ id }: ServiceGetFeedbackParams) {
  return getPrisma().feedback.findUniqueOrThrow({ where: { id } })
}

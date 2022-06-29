import type { NextApiRequest, NextApiResponse } from 'next'
import type { Issue } from '@prisma/client'
import { serviceGetIssues } from '~/services/issues'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Issue[]>,
) {
  const page = parseInt(req.query.page as string) || 0
  const pageSize = parseInt(req.query.pageSize as string) || 10
  const projectId = parseInt(req.query.projectId as string)
  const issues = await serviceGetIssues({
    page,
    pageSize,
    projectId,
  })
  res.status(200).json(issues)
}

import type { NextApiRequest, NextApiResponse } from 'next'
import type { Issue } from '@prisma/client'
import { PAGE_SIZE } from 'common'
import { serviceGetIssues } from '~/services/issues'
import { getAuth } from '~/libs/middleware'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<[Issue[], number]>,
) {
  const auth = await getAuth(req, res)
  if (!auth) return

  const page = parseInt(req.query.page as string) || 1
  const pageSize = parseInt(req.query.pageSize as string) || PAGE_SIZE
  const projectId = parseInt(req.query.projectId as string)
  const issues = await serviceGetIssues({
    page,
    pageSize,
    projectId,
  })
  res.status(200).json(issues)
}

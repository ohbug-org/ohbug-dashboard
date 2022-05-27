import type { NextApiRequest, NextApiResponse } from 'next'
import { Issue } from '@prisma/client'
import { serviceGetIssues } from '~/services/issues'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Issue[]>,
) {
  const skip = Number(req.query.skip as string) || 0
  const take = Number(req.query.take as string) || 100
  const issues = await serviceGetIssues({
    skip,
    take,
  })
  res.status(200).json(issues)
}

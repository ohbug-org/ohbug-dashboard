import type { NextApiRequest, NextApiResponse } from 'next'
import type { Issue } from '@prisma/client'
import { serviceGetIssue } from '~/services/issues'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Issue>,
) {
  const issue = await serviceGetIssue({ id: req.query.issueId as string })
  if (issue)
    res.status(200).json(issue)
  else
    res.end(`Issue ${req.query.issueId} not found`)
}

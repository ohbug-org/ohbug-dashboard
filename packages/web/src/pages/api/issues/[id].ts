import type { NextApiRequest, NextApiResponse } from 'next'
import type { Issue } from '@prisma/client'
import { serviceGetIssue } from '~/services/issues'
import { getAuth } from '~/libs/middleware'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Issue>,
) {
  const auth = await getAuth(req, res)
  if (!auth) return

  const issue = await serviceGetIssue({ id: req.query.id as string })
  if (issue) { res.status(200).json(issue) }
  else { res.end(`Issue ${req.query.id} not found`) }
}

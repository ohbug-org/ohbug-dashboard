import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '~/libs/middleware'
import type { serviceGetIssuesTrendsReturn } from '~/services/issues'
import { serviceGetIssuesTrends } from '~/services/issues'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<serviceGetIssuesTrendsReturn>,
) {
  const auth = await getAuth(req, res)
  if (!auth) return

  const ids = req.query.ids as string
  const type = (req.query.type || '24h') as '24h' | '14d'
  const trends = await serviceGetIssuesTrends({
    ids,
    type,
  })
  res.status(200).json(trends)
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '~/libs/middleware'
import type { ProjectTrend } from '~/services/projects'
import { serviceGetProjectTrends } from '~/services/projects'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProjectTrend[]>,
) {
  const auth = await getAuth(req, res)
  if (!auth) return

  const id = parseInt(req.query.id as string, 10)
  const type = (req.query.type || '24h') as '24h' | '14d'
  const trends = await serviceGetProjectTrends({
    id,
    type,
  })
  res.status(200).json(trends)
}

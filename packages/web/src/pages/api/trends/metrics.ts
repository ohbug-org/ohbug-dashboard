import type { NextApiRequest, NextApiResponse } from 'next'
import type { MetricType } from 'common'
import { getAuth } from '~/libs/middleware'
import type { MetricsTrend } from '~/services/metrics'
import { serviceGetMetricsTrends } from '~/services/metrics'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MetricsTrend[]>,
) {
  const auth = await getAuth(req, res)
  if (!auth) return

  const projectId = parseInt(req.query.projectId as string)
  const type = (req.query.type || '24h') as '24h' | '14d'
  const metric = req.query.metric as MetricType

  const trends = await serviceGetMetricsTrends({
    projectId,
    type,
    metric,
  })
  res.status(200).json(trends)
}

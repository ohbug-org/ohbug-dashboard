import { PAGE_SIZE } from 'common'
import type { NextApiRequest, NextApiResponse } from 'next'
import { serviceCreateAlert, serviceGetAlerts } from '~/services/alerts'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  const page = parseInt(req.query.page as string) || 1
  const pageSize = parseInt(req.query.pageSize as string) || PAGE_SIZE
  const projectId = parseInt(req.query.projectId as string)
  switch (method) {
    case 'POST':{
      const alert = req.body
      const result = await serviceCreateAlert(alert)
      res.status(200).json(result)
      break
    }
    case 'GET': {
      const result = await serviceGetAlerts({
        page,
        pageSize,
        projectId,
      })
      res.status(200).json(result)
      break
    }
    default:
      break
  }
}

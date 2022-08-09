import type { NextApiRequest, NextApiResponse } from 'next'
import { serviceDeleteAlert, serviceGetAlert, serviceUpdateAlert } from '~/services/alerts'
import { getAuth } from '~/libs/middleware'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const auth = await getAuth(req, res)
  if (!auth) return

  const { method } = req

  switch (method) {
    case 'PUT':{
      const alert = req.body
      const result = await serviceUpdateAlert(parseInt(req.query.id as string), alert)
      res.status(200).json(result)
      break
    }
    case 'GET': {
      const alert = await serviceGetAlert({ id: parseInt(req.query.id as string) })
      if (alert) { res.status(200).json(alert) }
      else { res.end(`Alert ${req.query.id} not found`) }
      break
    }
    case 'DELETE': {
      const alert = await serviceDeleteAlert({ id: parseInt(req.query.id as string) })
      if (alert) { res.status(200).json(alert) }
      else { res.end(`Alert ${req.query.id} not found`) }
      break
    }
    default:
      break
  }
}

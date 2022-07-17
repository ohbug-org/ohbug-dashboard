import * as crypto from 'crypto'
import { getConfig } from 'config'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '~/libs/middleware'
import { serviceCreateProject, serviceGetProjectsWithEventCount } from '~/services/projects'

const secret = getConfig().secret?.apikey ?? 'ohbug-apikey-s3cret'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const auth = await getAuth(req, res)
  if (!auth) return

  const { method } = req

  switch (method) {
    case 'POST':{
      const project = req.body
      const apiKey = crypto
        .createHmac('sha256', secret)
        .update(JSON.stringify(project) + new Date().getTime())
        .digest('hex')
      const result = await serviceCreateProject({ ...project, apiKey }, auth.user)
      res.status(200).json(result)
      break
    }
    case 'GET': {
      const result = await serviceGetProjectsWithEventCount(auth.user)
      res.status(200).json(result)
      break
    }
    default:
      break
  }
}

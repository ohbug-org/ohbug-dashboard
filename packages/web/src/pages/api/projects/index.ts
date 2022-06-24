import * as crypto from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import { serviceCreateProject, serviceGetProjects } from '~/services/projects'

const secret = process.env.APIKEY_SECRET ?? 'ohbug-apikey-s3cret'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  switch (method) {
    // create project
    case 'POST':{
      const project = req.body
      const apiKey = crypto
        .createHmac('sha256', secret!)
        .update(JSON.stringify(project) + new Date().getTime())
        .digest('hex')
      const result = await serviceCreateProject({ ...project, apiKey })
      res.status(200).json(result)
      break
    }
    // get projects
    case 'GET': {
      const result = await serviceGetProjects()
      res.status(200).json(result)
      break
    }
    default:
      break
  }
}

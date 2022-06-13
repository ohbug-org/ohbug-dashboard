import * as crypto from 'crypto'
import type { Project } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { serviceCreateProject } from '~/services/projects'

const secret = process.env.APIKEY_SECRET ?? 'ohbug-apikey-s3cret'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project>,
) {
  const { method } = req

  if (method === 'POST') {
    const project = req.body
    const apiKey = crypto
      .createHmac('sha256', secret!)
      .update(JSON.stringify(project) + new Date().getTime())
      .digest('hex')
    const result = await serviceCreateProject({ ...project, apiKey })
    res.status(200).json(result)
  }
}

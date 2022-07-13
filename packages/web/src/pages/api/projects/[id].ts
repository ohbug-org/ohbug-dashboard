import type { NextApiRequest, NextApiResponse } from 'next'
import type { Project } from '@prisma/client'
import { serviceGetProject, serviceUpdateProject } from '~/services/projects'
import { getAuth } from '~/libs/middleware'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project>,
) {
  const auth = await getAuth(req, res)
  if (!auth) return

  const { method, query, body } = req
  const id = parseInt(query.id as string, 10)

  switch (method) {
    case 'GET': {
      const project = await serviceGetProject(id)
      res.status(200).json(project)
      break
    }
    case 'PUT': {
      const project = await serviceUpdateProject(id, body)
      res.status(200).json(project)
      break
    }
    default: {
      res.status(404).end()
      break
    }
  }
}

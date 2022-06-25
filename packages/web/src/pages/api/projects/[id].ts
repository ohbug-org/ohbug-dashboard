import type { NextApiRequest, NextApiResponse } from 'next'
import type { Project } from '@prisma/client'
import { serviceUpdateProject } from '~/services/projects'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project>,
) {
  const { method, query, body } = req
  const id = query.id

  switch (method) {
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

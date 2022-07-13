import type { NextApiRequest, NextApiResponse } from 'next'
import type { Release } from '@prisma/client'
import { serviceGetRelease } from '~/services/releases'
import { getAuth } from '~/libs/middleware'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Release>,
) {
  const auth = await getAuth(req, res)
  if (!auth) return

  const { method, query } = req
  const id = parseInt(query.id as string, 10)

  switch (method) {
    case 'GET': {
      const project = await serviceGetRelease({ id })
      res.status(200).json(project)
      break
    }
    default: {
      res.status(404).end()
      break
    }
  }
}

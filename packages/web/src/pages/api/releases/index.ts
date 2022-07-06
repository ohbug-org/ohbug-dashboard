import type { Release } from '@prisma/client'
import { PAGE_SIZE } from 'common'
import type { NextApiRequest, NextApiResponse } from 'next'
import { serviceGetReleases } from '~/services/releases'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Release[]>,
) {
  const { method } = req

  const page = parseInt(req.query.page as string) || 1
  const pageSize = parseInt(req.query.pageSize as string) || PAGE_SIZE
  const projectId = parseInt(req.query.projectId as string)
  switch (method) {
    case 'GET': {
      const result = await serviceGetReleases({
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

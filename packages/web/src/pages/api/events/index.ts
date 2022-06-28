import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event } from '@prisma/client'
import { PAGE_SIZE } from 'common'
import { serviceGetEventByProjectId } from '~/services/events'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Event[]>,
) {
  const page = Number(req.query.page as string) || 0
  const pageSize = Number(req.query.pageSize as string) || PAGE_SIZE
  const projectId = Number(req.query.projectId as string)

  const { method } = req

  switch (method) {
    case 'GET': {
      if (projectId || projectId === 0) {
        const events = await serviceGetEventByProjectId({ projectId, page, pageSize })
        res.status(200).json(events)
      }
      break
    }
    default:
      break
  }
}

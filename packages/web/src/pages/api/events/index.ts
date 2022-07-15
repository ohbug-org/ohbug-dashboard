import type { NextApiRequest, NextApiResponse } from 'next'
import { PAGE_SIZE } from 'common'
import { serviceGetEventByProjectId, serviceGetEventsByIssueId } from '~/services/events'
import { getAuth } from '~/libs/middleware'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const auth = await getAuth(req, res)
  if (!auth) return

  const page = Number(req.query.page as string) || 1
  const pageSize = Number(req.query.pageSize as string) || PAGE_SIZE
  const projectId = Number(req.query.projectId as string)
  const issueId = req.query.issueId as string

  const { method } = req

  switch (method) {
    case 'GET': {
      if (projectId || projectId === 0) {
        const events = await serviceGetEventByProjectId({ projectId, page, pageSize })
        res.status(200).json(events)
      }
      else if (issueId) {
        const events = await serviceGetEventsByIssueId({ issueId, page, pageSize })
        res.status(200).json(events)
      }
      break
    }
    default:
      break
  }
}

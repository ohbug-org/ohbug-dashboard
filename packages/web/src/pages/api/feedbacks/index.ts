import type { NextApiRequest, NextApiResponse } from 'next'
import type { Feedback } from '@prisma/client'
import { PAGE_SIZE } from 'common'
import { serviceGetFeedbacks } from '~/services/feedbacks'
import { getAuth } from '~/libs/middleware'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Feedback[]>,
) {
  const auth = await getAuth(req, res)
  if (!auth) return

  const page = parseInt(req.query.page as string) || 1
  const pageSize = parseInt(req.query.pageSize as string) || PAGE_SIZE
  const projectId = parseInt(req.query.projectId as string)
  const query = req.query.query as string
  const feedbacks = await serviceGetFeedbacks({
    page,
    pageSize,
    projectId,
    query,
  })
  res.status(200).json(feedbacks)
}

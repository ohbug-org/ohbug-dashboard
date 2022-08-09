import type { NextApiRequest, NextApiResponse } from 'next'
import type { Feedback } from '@prisma/client'
import { getAuth } from '~/libs/middleware'
import { serviceGetFeedback } from '~/services/feedbacks'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Feedback>,
) {
  const auth = await getAuth(req, res)
  if (!auth) return

  const feedback = await serviceGetFeedback({ id: req.query.id as string })
  if (feedback) { res.status(200).json(feedback) }
  else { res.end(`Feedback ${req.query.id} not found`) }
}

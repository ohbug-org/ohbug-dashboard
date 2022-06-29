import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event } from '@prisma/client'
import { serviceGetEvent } from '~/services/events'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Event>,
) {
  const event = await serviceGetEvent({ id: req.query.id as string })
  if (event) { res.status(200).json(event) }
  else { res.end(`Event ${req.query.id} not found`) }
}

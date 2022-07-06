import type { Setting } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { serviceCreateSetting } from '~/services/bootstrap'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Setting>,
) {
  const { method } = req

  if (method === 'POST') {
    const result = await serviceCreateSetting(req.body)
    res.status(200).json(result)
  }
}

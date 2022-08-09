import type { NextApiRequest, NextApiResponse } from 'next'
import { serviceBindProjectMembers } from '~/services/users'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  switch (method) {
    case 'POST':{
      const data = req.body
      const result = await serviceBindProjectMembers(data)
      res.status(200).json(result)
      break
    }
    default:
      break
  }
}

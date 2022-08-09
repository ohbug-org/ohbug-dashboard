import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '~/libs/middleware'
import { serviceGetProjectsWithEventCount } from '~/services/projects'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const auth = await getAuth(req, res)
  if (!auth) return

  const result = await serviceGetProjectsWithEventCount(auth.user)
  res.status(200).json(result)
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { serviceGetProjectWithUsers } from '~/services/projects'
import { getAuth } from '~/libs/middleware'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const auth = await getAuth(req, res)
  if (!auth) return

  const { query } = req
  const id = parseInt(query.id as string, 10)

  const project = await serviceGetProjectWithUsers(id)
  res.status(200).json(project)
}

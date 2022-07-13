import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { getAuthOptions } from '~/pages/api/auth/[...nextauth]'

export async function getAuth(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const authOptions = await getAuthOptions()
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({ message: 'Please logged in.' })
    return false
  }
  return true
}

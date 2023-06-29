import type { Session, User } from '@prisma/client'
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { getAuthOptions } from '~/pages/api/auth/[...nextauth]'

export async function getAuth<Req, Res>(
  req: Req extends NextApiRequest ? Req : GetServerSidePropsContext['req'],
  res: Res extends NextApiResponse ? Res : GetServerSidePropsContext['res'],
) {
  const authOptions = await getAuthOptions()
  const session = (await getServerSession(req, res, authOptions)) as unknown as (Session & { user: User })
  if (!session) return null
  return session
}

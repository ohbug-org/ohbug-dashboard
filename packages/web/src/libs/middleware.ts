import type { Session, User } from '@prisma/client'
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { getAuthOptions } from '~/pages/api/auth/[...nextauth]'

export async function getAuth(
  req: NextApiRequest | GetServerSidePropsContext['req'],
  res: NextApiResponse | GetServerSidePropsContext['res'],
) {
  const authOptions = await getAuthOptions()
  const session = (await unstable_getServerSession(req, res, authOptions)) as unknown as (Session & { user: User })
  if (!session) {
    if ((res as NextApiResponse).redirect) {
      return (res as NextApiResponse).redirect(401, '/api/auth/signin')
    }
    else {
      return {
        redirect: {
          destination: '/api/auth/signin',
          permanent: false,
        },
      }
    }
  }
  return session
}

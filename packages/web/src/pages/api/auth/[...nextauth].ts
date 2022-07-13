import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { serviceGetSetting } from '~/services/bootstrap'
import { prisma } from '~/db'

export const getAuthOptions = async(): Promise<NextAuthOptions> => {
  const setting = await serviceGetSetting()
  return {
    adapter: PrismaAdapter(prisma),
    providers: [
      GithubProvider({
        clientId: setting?.githubClientId,
        clientSecret: setting?.githubClientSecret,
      }),
    ],
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const authOptions = await getAuthOptions()
  return NextAuth(req, res, authOptions)
}

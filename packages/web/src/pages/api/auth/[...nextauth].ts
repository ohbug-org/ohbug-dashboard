import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { serviceGetSetting } from '~/services/bootstrap'
import { prisma } from '~/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const setting = await serviceGetSetting()
  return NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    providers: [
      GithubProvider({
        clientId: setting?.githubClientId,
        clientSecret: setting?.githubClientSecret,
      }),
    ],
  })
}

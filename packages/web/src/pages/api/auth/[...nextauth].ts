import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { serviceGetSetting } from '~/services/bootstrap'
import { prisma } from '~/db'

export const getAuthOptions = async(): Promise<NextAuthOptions> => {
  const setting = await serviceGetSetting()
  const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [],
  }
  if (setting?.emailServer && setting.emailFrom) {
    options.providers.push(EmailProvider({
      server: setting?.emailServer,
      from: setting.emailFrom,
    }))
  }
  if (setting?.githubClientId && setting.githubClientSecret) {
    options.providers.push(GithubProvider({
      clientId: setting?.githubClientId,
      clientSecret: setting?.githubClientSecret,
      httpOptions: { timeout: 20000 },
    }))
  }
  return options
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const authOptions = await getAuthOptions()
  return NextAuth(req, res, authOptions)
}

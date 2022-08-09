import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { getConfig } from 'config'
import { getPrisma } from '~/db'

export const getAuthOptions = async(): Promise<NextAuthOptions> => {
  const config = getConfig()
  const options: NextAuthOptions = {
    adapter: PrismaAdapter(getPrisma()),
    providers: [],
    callbacks: {
      async session({ session, user }) {
        session.user = user
        return session
      },
    },
    pages: { signIn: '/auth/signin' },
  }
  if (config?.email) {
    options.providers.push(EmailProvider(config.email))
  }
  if (config?.oauth?.github) {
    options.providers.push(GithubProvider({
      clientId: config?.oauth?.github?.clientId,
      clientSecret: config?.oauth?.github.clientSecret,
      httpOptions: { timeout: 30000 },
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

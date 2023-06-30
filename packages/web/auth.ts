import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { getConfig } from 'config'
import { getPrisma } from '~/db'
import { serviceGetUser, serviceLogin } from '~/services/users'

export const getAuthOptions = (): NextAuthOptions => {
  const config = getConfig()
  const options: NextAuthOptions = {
    adapter: PrismaAdapter(getPrisma()),
    session: { strategy: 'jwt' },
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'email', type: 'text', placeholder: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          try {
            if (credentials) {
              const user = await serviceLogin({ email: credentials?.email, password: credentials?.password })
              if (user) {
                return user
              }
            }
            return null
          }
          catch (error) {
            console.error(error)
            return null
          }
        },
      }),
    ],
    callbacks: {
      jwt: async({ token, user }) => {
        if (user) token.user = user
        return token
      },
      async session({ session, user, token }) {
        if (user) session.user = user
        if (token) {
          // @ts-expect-error token 有 user
          const userData = await serviceGetUser(token.user?.id || user?.id)
          if (!userData) return session
          session.user = userData
          if ('password' in session.user) delete session.user.password
        }
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
      httpOptions: { timeout: 10000 },
    }))
  }
  return options
}

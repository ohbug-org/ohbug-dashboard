import type { User } from '@prisma/client'
import type { Session } from 'next-auth'
import { getServerSession } from 'next-auth'
import { getAuthOptions } from '~/auth'

export async function getAuth() {
  const authOptions = await getAuthOptions()
  const session = (await getServerSession<typeof authOptions, Session & { user: User }>(authOptions))
  if (!session) return null
  return session
}

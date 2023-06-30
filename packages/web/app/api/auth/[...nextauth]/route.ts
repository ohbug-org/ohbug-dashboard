import NextAuth from 'next-auth'
import { getAuthOptions } from '~/auth'

const authOptions = await getAuthOptions()
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

import type { Metadata } from 'next'
import { getProviders } from 'next-auth/react'
import SignIn from './signin'
import { serviceGetProject } from '~/services/projects'
import { serviceGetUser } from '~/services/users'

type ProviderType = 'email' | 'github' | 'credentials'

interface Provider {
  id: string
  name: string
  type: string
  callbackUrl: string
  signinUrl: string
}

async function getInviter(userId: string | null, projectId: string | null) {
  if (userId && projectId) {
    const project = await serviceGetProject(parseInt(projectId))
    const user = await serviceGetUser(userId)
    if (project && user) {
      return {
        project,
        user,
      }
    }
  }
}

export const metadata: Metadata = { title: 'SignIn | Ohbug' }

export default async function SignInPage({ params }: { params: { u: string; p: string } }) {
  const userId = params.u
  const projectId = params.p
  const providers = await getProviders() as Record<ProviderType, Provider>
  const inviter = await getInviter(userId, projectId)

  return (
    <SignIn
      inviter={inviter}
      providers={providers}
    />
  )
}

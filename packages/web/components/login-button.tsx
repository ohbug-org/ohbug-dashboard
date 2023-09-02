'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { type FC } from 'react'
import { Button } from '~/components/ui/button'

const LoginButton: FC = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <Button
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <Button
        onClick={() => signIn()}
      >
        Sign in
      </Button>
    </>
  )
}

export default LoginButton

'use client'

import type { FC } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@chakra-ui/react'

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

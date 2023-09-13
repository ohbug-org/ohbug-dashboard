'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '~/components/ui/button'

export default function LoginButton() {
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

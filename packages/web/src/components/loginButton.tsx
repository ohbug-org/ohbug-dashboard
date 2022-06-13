import type { FC } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

const LoginButton: FC = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button
          className="btn"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button
        className="btn"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  )
}

export default LoginButton

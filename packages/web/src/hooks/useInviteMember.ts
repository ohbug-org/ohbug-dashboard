import { useAtom } from 'jotai'
import { getSession } from 'next-auth/react'
import { useEffectOnce } from 'react-use'
import { inviteAtom } from '~/atoms/invite'

export function useInviteMember() {
  const [inviteValue, setInviteValue] = useAtom(inviteAtom)
  useEffectOnce(() => {
    (async() => {
      if (inviteValue) {
        const user = (await getSession())?.user
        // @ts-expect-error next-auth types are wrong
        if (user && user?.id !== inviteValue?.userId) {
          const body = {
            projectId: inviteValue?.projectId,
            // @ts-expect-error next-auth types are wrong
            userId: user?.id,
          }
          const res = await fetch(
            '/api/users/invite',
            {
              method: 'POST',
              body: JSON.stringify(body),
              headers: { 'Content-Type': 'application/json; charset=utf-8' },
            },
          )
          const data = await res.json()
          if (data) {
            setInviteValue(null)
          }
        }
      }
    })()
  })
}

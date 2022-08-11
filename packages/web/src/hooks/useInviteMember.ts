import { useAtom } from 'jotai'
import { getSession } from 'next-auth/react'
import { useEffectOnce } from 'react-use'
import { inviteAtom } from '~/atoms/invite'
import { serviceBindProjectMembers } from '~/services/users'

export function useInviteMember() {
  const [inviteValue, setInviteValue] = useAtom(inviteAtom)
  useEffectOnce(() => {
    (async() => {
      if (inviteValue) {
        const user = (await getSession())?.user
        // @ts-expect-error next-auth types are wrong
        if (user && user?.id !== inviteValue?.userId) {
          const data = {
            projectId: inviteValue?.projectId,
            // @ts-expect-error next-auth types are wrong
            userId: user?.id,
          }
          const result = await serviceBindProjectMembers(data)
          if (result) {
            setInviteValue(null)
          }
        }
      }
    })()
  })
}

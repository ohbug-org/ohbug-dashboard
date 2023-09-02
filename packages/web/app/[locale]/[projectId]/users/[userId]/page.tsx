import UserId from './user-id'
import { serviceGetEventUser } from '~/services/event-users'

export default async function UserIdPage({ params }: { params: { userId: string } }) {
  const userId = params.userId
  const user = await serviceGetEventUser({ id: userId })

  return (
    <UserId user={user} />
  )
}

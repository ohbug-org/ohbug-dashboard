import UserId from './userId'
import { serviceGetEventUser } from '~/services/eventUsers'

export default async function UserIdPage({ params }: { params: { userId: string } }) {
  const userId = params.userId
  const user = await serviceGetEventUser({ id: userId })

  return (
    <UserId user={user} />
  )
}

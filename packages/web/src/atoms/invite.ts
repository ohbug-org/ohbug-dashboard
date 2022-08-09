import { atomWithStorage } from 'jotai/utils'

interface userIdAndProjectId {
  projectId: number
  userId: string
}
export const inviteAtom = atomWithStorage<userIdAndProjectId | null>(
  'invite.userIdAndProjectId',
  null,
)

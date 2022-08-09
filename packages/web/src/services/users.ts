import { getPrisma } from '~/db'

export async function serviceGetUser(id: string) {
  return getPrisma().user.findUniqueOrThrow({ where: { id } })
}

interface ServiceBindProjectMembersParams {
  projectId: number
  userId: string
}
export function serviceBindProjectMembers({ projectId, userId }: ServiceBindProjectMembersParams) {
  return getPrisma().project.update({
    where: { id: projectId },
    data: {
      users: {
        create: {
          assignedAt: new Date(),
          user: { connect: { id: userId } },
        },
      },
    },
  })
}

import { prisma } from '~/db'

interface serviceGetEventParams {
  id?: string
  issueId?: string
}
export async function serviceGetEvent({ id, issueId }: serviceGetEventParams) {
  if (id) return prisma.event.findUnique({ where: { id } })
  if (issueId) {
    return (await prisma.issue.findUnique({
      where: { id: issueId },
      include: { events: true },
    }))?.events?.[0]
  }
  return null
}

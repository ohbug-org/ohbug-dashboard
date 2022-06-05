import { prisma } from '~/db'

interface getIssuesParams {
  skip: number
  take: number
}
export function serviceGetIssues({ skip = 0, take = 100 }: getIssuesParams) {
  return prisma.issue.findMany({
    skip,
    take,
    include: {
      _count: {
        select: {
          events: true,
          users: true,
        },
      },
    },
  })
}

interface getIssueParams {
  id: string
}
export function serviceGetIssue({ id }: getIssueParams) {
  return prisma.issue.findUnique({ where: { id } })
}

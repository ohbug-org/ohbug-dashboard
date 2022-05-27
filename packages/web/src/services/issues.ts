import { prisma } from '~/db'

interface getIssuesParams {
  skip: number
  take: number
}
export function serviceGetIssues({ skip = 0, take = 100 }: getIssuesParams) {
  return prisma.issue.findMany({
    skip,
    take,
  })
}

interface getIssueParams {
  id: number
}
export function serviceGetIssue({ id }: getIssueParams) {
  return prisma.issue.findUnique({ where: { id } })
}

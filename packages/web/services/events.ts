import { getStackFrame, getTheSourceByError } from 'source-map-trace'
import type { OhbugEventLike, Pagination, ReceiveSourceMapFile } from 'common'
import { PAGE_SIZE, pagination } from 'common'
import { serviceGetProject } from './projects'
import { getPrisma } from '~/db'

interface ServiceGetEventParams {
  id?: string
  issueId?: string
}
export async function serviceGetEvent({ id, issueId }: ServiceGetEventParams) {
  if (id) {
    const event = getPrisma().event.findUniqueOrThrow({
      where: { id },
      include: { user: true },
    }) as unknown as OhbugEventLike
    const source = await serviceGetEventSource(event)
    return { ...event, source }
  }
  if (issueId) {
    const event = (
      await getPrisma().event.findMany({
        where: { issueId },
        orderBy: { createdAt: 'desc' },
        take: 1,
        include: { user: true },
      })
    ).at(0) as unknown as OhbugEventLike
    const source = await serviceGetEventSource(event)
    return { ...event, source }
  }

  return null
}

interface ServiceGetEventsByIssueIdParams extends Pagination {
  issueId: string
}
export async function serviceGetEventsByIssueId({
  issueId,
  page = 0,
  pageSize = PAGE_SIZE,
}: ServiceGetEventsByIssueIdParams) {
  return getPrisma().event.findMany({
    where: { issueId },
    ...pagination({ page, pageSize }),
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function serviceGetEventSource(event: OhbugEventLike) {
  try {
    const stackFrame = getStackFrame(event.detail)
    if (stackFrame) {
      const release = await getPrisma().release.findFirst({
        where: {
          apiKey: event.apiKey,
          appVersion: event.appVersion,
          appType: event.appType,
        },
      })
      if (release) {
        const sourceMapTarget = (release?.sourceMaps as unknown as ReceiveSourceMapFile[]).find(({ originalname }) => {
          const sourceFileName = originalname.split('.map')[0]
          return stackFrame.fileName?.includes(sourceFileName)
        })
        if (sourceMapTarget) { return getTheSourceByError(sourceMapTarget.path, event.detail) }
      }
    }
    return undefined
  }
  catch (_) {
    return undefined
  }
}

interface ServiceGetEventByProjectIdParams extends Pagination {
  projectId: number
}
export async function serviceGetEventByProjectId({
  projectId,
  page = 0,
  pageSize = PAGE_SIZE,
}: ServiceGetEventByProjectIdParams) {
  const project = await serviceGetProject(projectId)
  if (project) {
    const apiKey = project.apiKey
    return getPrisma().event.findMany({
      where: { apiKey },
      ...pagination({ page, pageSize }),
      orderBy: { createdAt: 'desc' },
    })
  }
  return []
}

import { getStackFrame, getTheSourceByError } from 'source-map-trace'
import type { OhbugEventLike, Pagination, ReceiveSourceMapFile } from 'common'
import { PAGE_SIZE, pagination } from 'common'
import { serviceGetProject } from './projects'
import { prisma } from '~/db'

interface ServiceGetEventParams {
  id?: string
  issueId?: string
}
export async function serviceGetEvent({ id, issueId }: ServiceGetEventParams) {
  if (id) {
    const event = prisma.event.findUniqueOrThrow({ where: { id } }) as unknown as OhbugEventLike
    const source = await serviceGetEventSource(event)
    return { ...event, source }
  }
  if (issueId) {
    const event = (
      await prisma.issue.findUniqueOrThrow({
        where: { id: issueId },
        include: { events: true },
      })
    )?.events?.[0] as unknown as OhbugEventLike
    const source = await serviceGetEventSource(event)
    return { ...event, source }
  }

  return null
}

export async function serviceGetEventSource(event: OhbugEventLike) {
  try {
    const stackFrame = getStackFrame(event.detail)
    if (stackFrame) {
      const release = await prisma.release.findFirst({
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
    return prisma.event.findMany({
      where: { apiKey },
      ...pagination({ page, pageSize }),
    })
  }
  return []
}

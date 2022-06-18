import { getStackFrame, getTheSourceByError } from 'source-map-trace'
import type { OhbugEventLike, ReceiveSourceMapFile } from 'types'
import { prisma } from '~/db'

interface serviceGetEventParams {
  id?: string
  issueId?: string
}
export async function serviceGetEvent({ id, issueId }: serviceGetEventParams) {
  if (id) {
    const event = prisma.event.findUnique({ where: { id } }) as unknown as OhbugEventLike
    const source = await serviceGetEventSource(event)
    return { ...event, source }
  }
  if (issueId) {
    const event = (
      await prisma.issue.findUnique({
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
        if (sourceMapTarget)
          return await getTheSourceByError(sourceMapTarget.path, event.detail)
      }
    }
    return undefined
  }
  catch (_) {
    return undefined
  }
}
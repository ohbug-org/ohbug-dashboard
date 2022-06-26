import type { Project } from '@prisma/client'

export interface ProjectWithEventCount extends Project {
  eventCount: number
}

import type { Project, User } from '@prisma/client'

export interface ProjectWithEventCount extends Project {
  eventCount: number
}

export interface ProjectWithMembers extends Project {
  members?: User[]
}

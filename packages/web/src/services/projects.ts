import type { Project } from '@prisma/client'
import { prisma } from '~/db'

export function serviceGetProjects() {
  return prisma.project.findMany()
}

export async function serviceCreateProject(data: Project) {
  return prisma.project.create({ data })
}

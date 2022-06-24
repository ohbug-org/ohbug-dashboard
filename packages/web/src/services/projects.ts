import type { Project } from '@prisma/client'
import { prisma } from '~/db'

export function serviceGetProjects() {
  return prisma.project.findMany()
}

export async function serviceCreateProject(data: Project) {
  let isDefault = false
  const projects = await serviceGetProjects()
  if (!projects.length) isDefault = true

  return prisma.project.create({
    data: {
      ...data,
      default: isDefault,
    },
  })
}

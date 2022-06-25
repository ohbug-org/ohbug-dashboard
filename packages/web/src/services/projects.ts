import type { Project } from '@prisma/client'
import dayjs from 'dayjs'
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

export async function serviceUpdateProject(id: number, data: Project) {
  return prisma.project.update({
    where: { id },
    data,
  })
}

interface serviceGetProjectTrendsParams {
  id: number
  type: '24h' | '14d'
}
export interface ProjectTrend {
  time: string
  count: number
}
export async function serviceGetProjectTrends({ id, type }: serviceGetProjectTrendsParams) {
  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) throw new Error(`Can't find Project with projectId: ${id}`)

  const apiKey = project.apiKey
  const format = type === '14d' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH'
  const unit = type === '14d' ? 'day' : 'hour'
  const interval = type === '14d' ? 14 : 24
  const max = dayjs()
  const min = max.subtract(interval, unit)

  const trends = await prisma.$queryRawUnsafe<ProjectTrend[]>(`
    SELECT to_char("Event"."createdAt", '${format}') AS time, count("Event".*)
    FROM "Event"
    WHERE "Event"."apiKey" = '${apiKey}'
    AND "Event"."createdAt" BETWEEN '${min.format('YYYY-MM-DD HH:mm:ss')}' AND '${max.format('YYYY-MM-DD HH:mm:ss')}'
    GROUP BY time
  `)

  return Array.from(new Array(interval + 1)).map((_, index) => {
    const time = dayjs(min).add(index, unit).format(format)
    const match = trends.find(v => (v.time === time))
    if (match) return match
    return {
      time,
      count: 0,
    }
  })
}

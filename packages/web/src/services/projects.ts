import type { Project, User } from '@prisma/client'
import dayjs from 'dayjs'
import type { ProjectWithEventCount } from 'common'
import { getPrisma } from '~/db'

export async function serviceGetProject(id: number) {
  return getPrisma().project.findUniqueOrThrow({ where: { id } })
}

export async function serviceGetProjects(user: User) {
  if (!user) return []
  return getPrisma().project.findMany({ where: { users: { some: { userId: user.id } } } })
}

export async function serviceGetProjectsWithEventCount(user: User): Promise<ProjectWithEventCount[]> {
  const projects = await serviceGetProjects(user)
  const projectWithEventCounts = []
  for (const project of projects) {
    const eventCount = await serviceGetProjectEventsCount(project.id)
    projectWithEventCounts.push({
      ...project,
      eventCount,
    })
  }
  return projectWithEventCounts
}

export async function serviceCreateProject(data: Project, user: User) {
  let isDefault = false
  const projects = await serviceGetProjects(user)
  if (!projects.length) isDefault = true

  return getPrisma().project.create({
    data: {
      ...data,
      default: isDefault,
      users: { create: { userId: user.id } },
    },
  })
}

export async function serviceUpdateProject(id: number, data: Project) {
  return getPrisma().project.update({
    where: { id },
    data,
  })
}

interface ServiceGetProjectTrendsParams {
  id: number
  type: '24h' | '14d'
}
export interface ProjectTrend {
  time: string
  count: number
}
export async function serviceGetProjectTrends({ id, type }: ServiceGetProjectTrendsParams) {
  const project = await serviceGetProject(id)

  const apiKey = project.apiKey
  const format = type === '14d' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH'
  const unit = type === '14d' ? 'day' : 'hour'
  const interval = type === '14d' ? 14 : 24
  const max = dayjs()
  const min = max.subtract(interval, unit)

  const trends = await getPrisma().$queryRawUnsafe<ProjectTrend[]>(`
    SELECT to_char("Event"."createdAt", '${format}') AS time, count("Event".*)::int
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

export async function serviceGetProjectEventsCount(id: number) {
  const project = await serviceGetProject(id)

  const apiKey = project.apiKey
  return getPrisma().event.count({ where: { apiKey } })
}

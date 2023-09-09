'use client'

import Link from 'next/link'
import { type ProjectWithEventCount } from 'common'
import { type ProjectTrend } from '~/services/projects'
import { serviceGetProjectTrends } from '~/services/projects'
import { useQuery } from '~/hooks/use-query'
import Loading from '~/components/loading'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import LineChart from '~/components/charts/line-chart'

interface Props {
  project: ProjectWithEventCount
}

export default function ProjectCard({ project }: Props) {
  const { data: trends, isLoading } = useQuery<ProjectTrend[]>(
    () => serviceGetProjectTrends({
      id: project.id,
      type: '14d',
    }),
    { enabled: project.id !== undefined },
  )

  return (
    <Link href={`/${project.id}/profile`}>
      <Card>
        <CardHeader>
          <div className="flex gap-6">
            <Avatar>
              <AvatarImage
                alt={project.name}
                src={project.image ?? ''}
              />
              <AvatarFallback>{project.name}</AvatarFallback>
            </Avatar>
            <div className="space-x-4">
              <span className="cursor-pointer font-semibold">
                {project.name}
              </span>

              <span className="text-xs text-stone-500">
                Events: {project.eventCount ?? 0}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-16">
            {
              isLoading
                ? <Loading />
                : (
                  <LineChart
                    data={trends}
                    name="Events"
                    nameKey="time"
                    valueKey="count"
                  />
                  )
            }
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

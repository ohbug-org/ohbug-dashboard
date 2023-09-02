'use client'

import Link from 'next/link'
import { type ProjectWithEventCount } from 'common'
import Loading from './loading'
import TrendChart from './trend-chart'
import { type ProjectTrend } from '~/services/projects'
import { serviceGetProjectTrends } from '~/services/projects'
import { useQuery } from '~/hooks/use-query'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

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
        <CardHeader />
        <CardContent>
          <div className="flex gap-6">
            <Avatar>
              <AvatarImage
                alt={project.name}
                src={project.image ?? ''}
              />
              <AvatarFallback>{project.name}</AvatarFallback>
            </Avatar>
            <div className="space-x-6">
              <span className="cursor-pointer font-semibold">
                {project.name}
              </span>

              <span className="text-xs text-stone-500">
                Events: {project.eventCount ?? 0}
              </span>
            </div>
          </div>

          <div className="mt-4">
            {
              isLoading
                ? <Loading />
                : (
                  <TrendChart
                    data={trends}
                    type="14d"
                  />
                  )
            }
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

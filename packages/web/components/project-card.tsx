'use client'

import { Card, CardBody } from '@nextui-org/react'
import { Avatar, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { type ProjectWithEventCount } from 'common'
import Loading from './loading'
import TrendChart from './trend-chart'
import { type ProjectTrend } from '~/services/projects'
import { serviceGetProjectTrends } from '~/services/projects'
import { useQuery } from '~/hooks/use-query'

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
      <Card isBlurred>
        <CardBody>
          <div className="flex gap-6">
            <Avatar
              name={project.name}
              src={project.image ?? ''}
            />
            <div>
              <Text
                cursor="pointer"
                fontWeight="semibold"
              >
                {project.name}
              </Text>

              <Text
                fontSize="xs"
                textColor="gray.500"
              >
              Events: {project.eventCount ?? 0}
              </Text>
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
        </CardBody>
      </Card>
    </Link>
  )
}

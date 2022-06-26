import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import type { FC } from 'react'
import { useMemo } from 'react'
import useSWR from 'swr'
import type { ProjectWithEventCount } from 'types'
import Loading from './loading'
import TrendChart from './trendChart'
import Card from './card'
import type { ProjectTrend } from '~/services/projects'

interface Props {
  project: ProjectWithEventCount
}
const ProjectCard: FC<Props> = ({ project }) => {
  const { data: trends } = useSWR<ProjectTrend[]>(`/api/trends/projects?id=${project.id}&type=14d`)
  const trendLoading = useMemo(() => !trends, [trends])

  return (
    <Card w="sm">
      <Flex gap="6">
        <Avatar
          name={project.name}
          src={project.image ?? ''}
        />
        <Box>
          <Link href={`/projects/${project.id}`}>
            <Text
              cursor="pointer"
              fontWeight="bold"
            >
              {project.name}
            </Text>
          </Link>
          <Text
            fontSize="xs"
            textColor="gray.500"
          >
            Events: {project.eventCount ?? 0}
          </Text>
        </Box>
      </Flex>

      <Box mt="4">
        {
          trendLoading
            ? <Loading />
            : (
              <TrendChart
                data={trends}
                type="14d"
              />
            )
        }
      </Box>
    </Card>
  )
}

export default ProjectCard

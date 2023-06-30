'use client'

import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import type { FC } from 'react'
import type { ProjectWithEventCount } from 'common'
import Loading from './loading'
import TrendChart from './trendChart'
import Card from './card'
import type { ProjectTrend } from '~/services/projects'
import { serviceGetProjectTrends } from '~/services/projects'
import { useQuery } from '~/hooks/useQuery'

interface Props {
  project: ProjectWithEventCount
}
const ProjectCard: FC<Props> = ({ project }) => {
  const { data: trends, isLoading } = useQuery<ProjectTrend[]>(
    () => serviceGetProjectTrends({
      id: project.id,
      type: '14d',
    }),
    { enabled: project.id !== undefined },
  )

  return (
    <NextLink
      href={`/${project.id}/profile`}
      passHref
    >
      <Card
        hover
        minW="sm"
        w="full"
      >
        <Flex gap="6">
          <Avatar
            name={project.name}
            src={project.image ?? ''}
          />
          <Box>
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
          </Box>
        </Flex>

        <Box mt="4">
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
        </Box>
      </Card>
    </NextLink>
  )
}

export default ProjectCard

import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import type { Project } from '@prisma/client'
import Link from 'next/link'
import type { FC } from 'react'
import { useMemo } from 'react'
import useSWR from 'swr'
import type { ProjectTrend } from 'types'
import Loading from './loading'
import MiniChart from './miniChart'

interface Props {
  project: Project
}
const ProjectCard: FC<Props> = ({ project }) => {
  const { data: trends } = useSWR<ProjectTrend[]>(`/api/trends/projects?id=${project.id}&type=14d`)
  const trendLoading = useMemo(() => !trends, [trends])

  return (
    <Box
      bg="white"
      boxShadow="lg"
      p="4"
      rounded="md"
      w="sm"
    >
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
          <Text textColor="gray.500">Events: {23}</Text>
        </Box>
      </Flex>

      <Box mt="4">
        {
          trendLoading
            ? <Loading />
            : (
              <MiniChart
                data={trends}
                type="14d"
              />
            )
        }
      </Box>
    </Box>
  )
}

export default ProjectCard

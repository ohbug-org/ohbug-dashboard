import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import type { Project } from '@prisma/client'
import Link from 'next/link'
import type { FC } from 'react'

interface Props {
  project: Project
}
const ProjectCard: FC<Props> = ({ project }) => {
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

      <Box mt="4">content</Box>

      <Box mt="4">
      footer
      </Box>
    </Box>
  )
}

export default ProjectCard

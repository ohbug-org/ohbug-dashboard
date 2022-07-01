import { Button, Flex, SimpleGrid } from '@chakra-ui/react'
import type { Setting } from '@prisma/client'
import type { ProjectWithEventCount } from 'common'
import type { GetServerSideProps, NextPage } from 'next'
import { RiAddLine } from 'react-icons/ri'
import NextLink from 'next/link'
import ProjectCard from '~/components/projectCard'
import Wrapper from '~/components/wrapper'
import { serviceGetSetting } from '~/services/bootstrap'
import { serviceGetProjectsWithEventCount } from '~/services/projects'

interface Props {
  setting: Setting | null
  projects: ProjectWithEventCount[]
}

export const getServerSideProps: GetServerSideProps<Props> = async() => {
  const setting = await serviceGetSetting()
  if (!setting) {
    return {
      redirect: {
        destination: '/bootstrap',
        permanent: false,
      },
    }
  }
  const projects = await serviceGetProjectsWithEventCount()
  if (!projects || !projects.length) {
    return {
      redirect: {
        destination: '/create-project',
        permanent: false,
      },
    }
  }

  return { props: { setting, projects } }
}

const Home: NextPage<Props> = ({ projects }) => {
  return (
    <Wrapper>
      <Flex justify="end">
        <NextLink href="/create-project">
          <Button
            leftIcon={<RiAddLine />}
          >
            Create a Project
          </Button>
        </NextLink>
      </Flex>
      <SimpleGrid
        columns={3}
        mt="4"
        spacing="8"
      >
        {
          projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))
        }
      </SimpleGrid>
    </Wrapper>
  )
}

export default Home

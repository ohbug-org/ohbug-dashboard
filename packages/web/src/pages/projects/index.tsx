import { SimpleGrid } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import type { ProjectWithEventCount } from 'types'
import ProjectCard from '~/components/projectCard'
import { serviceGetProjectsWithEventCount } from '~/services/projects'

interface Props {
  projects: ProjectWithEventCount[]
}

export const getServerSideProps: GetServerSideProps<Props> = async() => {
  const projects = await serviceGetProjectsWithEventCount()
  return { props: { projects } }
}

const Projects: NextPage<Props> = ({ projects }) => {
  return (
    <SimpleGrid
      columns={3}
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
  )
}

export default Projects

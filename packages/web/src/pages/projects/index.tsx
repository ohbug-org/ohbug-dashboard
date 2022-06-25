import { SimpleGrid } from '@chakra-ui/react'
import type { Project } from '@prisma/client'
import type { GetServerSideProps, NextPage } from 'next'
import ProjectCard from '~/components/projectCard'
import { serviceGetProjects } from '~/services/projects'

interface Props {
  projects: Project[]
}

export const getServerSideProps: GetServerSideProps<Props> = async() => {
  const projects = await serviceGetProjects()
  return { props: { projects } }
}

const Projects: NextPage<Props> = ({ projects }) => {
  return (
    <SimpleGrid
      columns={3}
      spacing="6"
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

import { Button, Flex, SimpleGrid } from '@chakra-ui/react'
import type { ProjectWithEventCount } from 'common'
import type { GetServerSideProps, NextPage } from 'next'
import { RiAddLine } from 'react-icons/ri'
import NextLink from 'next/link'
import { useTranslations } from 'next-intl'
import type { Config } from 'config'
import { getConfig } from 'config'
import ProjectCard from '~/components/projectCard'
import Wrapper from '~/components/wrapper'
import { serviceGetProjectsWithEventCount } from '~/services/projects'
import { getAuth } from '~/libs/middleware'

interface Props {
  config: Config | null
  projects: ProjectWithEventCount[]
}

export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
  const config = getConfig()

  const auth = await getAuth(context.req, context.res)
  if (!auth) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }
  const projects = await serviceGetProjectsWithEventCount(auth.user)
  if (!projects || !projects.length) {
    return {
      redirect: {
        destination: '/create-project',
        permanent: false,
      },
    }
  }

  return { props: { config, projects } }
}

const Home: NextPage<Props> = ({ projects }) => {
  const t = useTranslations('Index')
  return (
    <Wrapper>
      <Flex justify="end">
        <NextLink href="/create-project">
          <Button
            leftIcon={<RiAddLine />}
          >
            {t('createProject')}
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

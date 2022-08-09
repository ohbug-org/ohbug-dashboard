import { Button, Flex, SimpleGrid } from '@chakra-ui/react'
import type { ProjectWithEventCount } from 'common'
import type { NextPage } from 'next'
import { RiAddLine } from 'react-icons/ri'
import NextLink from 'next/link'
import { useTranslations } from 'next-intl'
import useSWR from 'swr'
import ProjectCard from '~/components/projectCard'
import Wrapper from '~/components/wrapper'
import { useInviteMember } from '~/hooks/useInviteMember'

const Home: NextPage = () => {
  const t = useTranslations('Index')
  const { data: projects } = useSWR<ProjectWithEventCount[]>('/api/projects')
  useInviteMember()

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
          projects?.map(project => (
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

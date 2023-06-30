'use client'

import { Button, Flex, SimpleGrid } from '@chakra-ui/react'
import { RiAddLine } from 'react-icons/ri'
import NextLink from 'next/link'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'
import type { User } from '@prisma/client'
import ProjectCard from '~/components/projectCard'
import Wrapper from '~/components/wrapper'
import { useInviteMember } from '~/hooks/useInviteMember'
import { useQuery } from '~/hooks/useQuery'
import { serviceGetProjectsWithEventCount } from '~/services/projects'

export default function Home() {
  const t = useTranslations('Index')
  const session = useSession()
  const { data: projects } = useQuery(
    () => serviceGetProjectsWithEventCount(session.data?.user as User),
    { enabled: session.status === 'authenticated' },
  )

  useInviteMember()

  return (
    <Wrapper>
      <Flex justify="end">
        <NextLink
          href="/create-project"
          passHref
        >
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

'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'
import { type User } from '@prisma/client'
import { Button } from '~/components/ui/button'
import ProjectCard from '~/components/project-card'
import Wrapper from '~/components/wrapper'
import { useInviteMember } from '~/hooks/use-invite-member'
import { useQuery } from '~/hooks/use-query'
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
      <div className="flex justify-end">
        <Link href="/create-project">
          <Button>
            <i className="i-ri-add-line mr-2" /> {t('createProject')}
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {
          projects?.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))
        }
      </div>
    </Wrapper>
  )
}

'use client'

import { Button, Card } from '@nextui-org/react'
import type { Release } from '@prisma/client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import LoadingMoreButton from '~/components/load-more-button'
import ReleaseList from '~/components/release-list'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/use-current-project'
import { useInfinite } from '~/hooks/use-infinite'
import { serviceGetReleases } from '~/services/releases'

export default function ReleasesPage() {
  const ct = useTranslations('Common')
  const { projectId } = useCurrentProject()
  const { data, isLoading, size, setSize, isReachingEnd, mutate } = useInfinite<Release>(
    index => serviceGetReleases({
      page: index + 1,
      projectId: projectId!,
    }),
    {
      enabled: projectId !== undefined,
      deps: [projectId],
    },
  )

  return (
    <div>
      <Title
        rightNodes={
          (
            <Link
              href="https://ohbug.net/guide/releases.html"
              target="_blank"
            >
              <Button
                startContent={
                  (
                    <i className="i-ri-question-line" />
                  )
                }
                variant="ghost"
              >
                {ct('integration')}
              </Button>
            </Link>
          )
        }
      >
        Releases
      </Title>

      <Wrapper className="flex flex-col gap-12 py-12">
        <Card>
          {
            data && (
              <ReleaseList
                mutate={mutate}
                releases={data}
              />
            )
          }
          <LoadingMoreButton
            isLoading={isLoading}
            isReachingEnd={isReachingEnd}
            onClick={() => setSize(size + 1)}
          />
        </Card>
      </Wrapper>
    </div>
  )
}

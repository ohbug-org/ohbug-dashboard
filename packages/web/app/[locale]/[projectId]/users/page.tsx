'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useDebounce } from 'react-use'
import { Button, Input } from '@nextui-org/react'
import { type EventUser } from '@prisma/client'
import UsersList from '~/components/users-list'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/use-current-project'
import { useInfinite } from '~/hooks/use-infinite'
import { serviceGetEventUsers } from '~/services/eventUsers'

export default function UsersPage() {
  const ct = useTranslations('Common')
  const { projectId } = useCurrentProject()
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  useDebounce(
    () => {
      setDebouncedQuery(query)
    },
    500,
    [query],
  )
  const { data: eventUsers, isLoading, size, setSize, isReachingEnd } = useInfinite<(
  EventUser & {
    _count: {
      issues: number
      metrics: number
      feedbacks: number
      pageViews: number
      userViews: number
    }
  })>(
    index => serviceGetEventUsers({
      page: index + 1,
      projectId: projectId!,
      query: debouncedQuery,
    }),
    {
      enabled: projectId !== undefined,
      deps: [projectId, debouncedQuery],
    },
    )

  return (
    <div>
      <Title>
        <div className="flex gap-4 w-full">
          <h2 className="font-semibold text-lg w-full">
            Users
          </h2>
          <div className="w-full">
            <Input
              onChange={e => setQuery(e.target.value)}
              placeholder="Search for users ipAddress uuid email name and metadata"
              startContent={<i className="i-ri-search-line" />}
              value={query}
            />
          </div>
        </div>
      </Title>

      <Wrapper>
        <UsersList users={eventUsers} />
        <Button
          className="w-full mt-6"
          disabled={isLoading || isReachingEnd}
          onClick={() => setSize(size + 1)}
        >
          {
            isLoading
              ? `${ct('loading')}...`
              : isReachingEnd
                ? ct('noMoreData')
                : ct('loadMore')
          }
        </Button>
      </Wrapper>
    </div>
  )
}

'use client'

import { Box, Button, Heading, Input, InputGroup, InputLeftElement, VStack } from '@chakra-ui/react'
import type { EventUser } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { RiSearchLine } from 'react-icons/ri'
import { useState } from 'react'
import { useDebounce } from 'react-use'
import UsersList from '~/components/usersList'
import ThemeBox from '~/components/themeBox'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/useCurrentProject'
import { useInfinite } from '~/hooks/useInfinite'
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
    <ThemeBox bg="current">
      <Title>
        <VStack
          spacing="4"
          w="full"
        >
          <Heading
            fontWeight="semibold"
            size="lg"
            w="full"
          >
            Users
          </Heading>
          <Box w="full">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
              >
                <RiSearchLine />
              </InputLeftElement>
              <Input
                onChange={e => setQuery(e.target.value)}
                placeholder="Search for users ipAddress uuid email name and metadata"
                value={query}
                variant="filled"
              />
            </InputGroup>
          </Box>
        </VStack>
      </Title>

      <Wrapper>
        <UsersList users={eventUsers} />
        <Button
          disabled={isLoading || isReachingEnd}
          mt="6"
          onClick={() => setSize(size + 1)}
          size="sm"
          variant="outline"
          w="full"
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
    </ThemeBox>
  )
}

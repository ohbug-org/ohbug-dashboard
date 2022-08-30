import { Button } from '@chakra-ui/react'
import type { EventUser } from '@prisma/client'
import type { NextPage } from 'next'
import { useTranslations } from 'next-intl'
import UsersList from '~/components/usersList'
import ThemeBox from '~/components/themeBox'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/useCurrentProject'
import { useInfinite } from '~/hooks/useInfinite'
import { serviceGetEventUsers } from '~/services/eventUsers'

const Users: NextPage = () => {
  const ct = useTranslations('Common')
  const { projectId } = useCurrentProject()
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
    }),
    {
      enabled: projectId !== undefined,
      deps: [projectId],
    },
    )

  return (
    <ThemeBox bg="current">
      <Title>
        Users
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

export default Users

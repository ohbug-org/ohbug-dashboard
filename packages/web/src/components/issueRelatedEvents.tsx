import type { Issue } from 'common'
import { Button } from '@chakra-ui/react'
import type { Event } from '@prisma/client'
import type { FC } from 'react'
import EventsList from '~/components/eventsList'
import ThemeBox from '~/components/themeBox'
import Wrapper from '~/components/wrapper'
import CardSection from '~/components/cardSection'
import { useInfinite } from '~/hooks/useInfinite'

interface Props {
  issue: Issue
}

const IssueRelatedEvents: FC<Props> = ({ issue }) => {
  const { data: events, isLoading, size, setSize, isReachingEnd } = useInfinite<Event>(index => `/api/events?issueId=${issue.id}&page=${index + 1}`)

  return (
    <ThemeBox bg="gray">
      <Wrapper>
        <CardSection title="Events">
          <EventsList events={events} />
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
                ? 'Loading...'
                : isReachingEnd
                  ? 'No More Events'
                  : 'Load More'
            }
          </Button>
        </CardSection>
      </Wrapper>
    </ThemeBox>
  )
}

export default IssueRelatedEvents

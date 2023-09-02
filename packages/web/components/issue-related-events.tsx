'use client'

import { type Event } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { type Issue } from 'common'
import EventsList from '~/components/events-list'
import Wrapper from '~/components/wrapper'
import AccordionSection from '~/components/ui/accordion-section'
import { useInfinite } from '~/hooks/use-infinite'
import { serviceGetEventsByIssueId } from '~/services/events'
import { Button } from '~/components/ui/button'

interface Props {
  issue: Issue
}

export default function IssueRelatedEvents({ issue }:Props) {
  const ct = useTranslations('Common')
  const { data: events, isLoading, size, setSize, isReachingEnd } = useInfinite<Event>(
    index => serviceGetEventsByIssueId({ issueId: issue.id, page: index + 1 }),
    {
      enabled: issue.id !== undefined,
      deps: [issue.id],
    },
  )

  return (
    <Wrapper>
      <AccordionSection title="Events">
        <EventsList events={events} />
        <Button
          className='mt-6 w-full'
          disabled={isLoading || isReachingEnd}
          onClick={() => setSize(size + 1)}
          size="sm"
          variant="outline"
        >
          {
            isLoading
              ? `${ct('loading')}...`
              : isReachingEnd
                ? ct('noMoreData')
                : ct('loadMore')
          }
        </Button>
      </AccordionSection>
    </Wrapper>
  )
}

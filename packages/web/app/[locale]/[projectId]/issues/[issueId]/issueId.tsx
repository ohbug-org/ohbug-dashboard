'use client'

import type { Issue, OhbugEventLike } from 'common'
import { Flex } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import EventDetailActions from '~/components/eventDetailAction'
import EventDetailProfile from '~/components/eventDetailProfile'
import EventDetailStack from '~/components/eventDetailStack'
import IssueDetailTitle from '~/components/issueDetailTitle'
import EventDetailTrend from '~/components/eventDetailTrend'
import EventDetailUser from '~/components/eventDetailUser'
import IssueRelatedEvents from '~/components/issueRelatedEvents'
import type { IssueTrend } from '~/services/issues'
import IssueRelatedMetadata from '~/components/issueRelatedMetadata'

const IssueRelatedRrweb = dynamic(
  () => {
    return import('~/components/issueRelatedRrweb')
  },
  { ssr: false },
)

interface Props {
  issue: Issue
  event: OhbugEventLike
  trends: {
    '14d': IssueTrend[]
    '24h': IssueTrend[]
  }
}

export default function IssueId({ issue, event, trends }: Props) {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')

  const nodes = useMemo(() => {
    if (!tab || tab === 'detail') {
      return (
        <>
          <EventDetailProfile event={event} />

          <EventDetailStack event={event} />

          <EventDetailActions event={event} />

          <EventDetailTrend
            issue={issue}
            trends={trends}
          />

          <EventDetailUser event={event} />
        </>
      )
    }
    else if (tab === 'events') {
      return (
        <IssueRelatedEvents issue={issue} />
      )
    }
    else if (tab === 'rrweb') {
      return (
        <IssueRelatedRrweb event={event} />
      )
    }
    return (
      <IssueRelatedMetadata
        event={event}
        tab={tab}
      />
    )
  }, [tab, event, issue, trends])

  return (
    <Flex
      flexDirection="column"
      gap="6"
    >
      <IssueDetailTitle
        event={event}
        issue={issue}
      />

      {nodes}
    </Flex>
  )
}

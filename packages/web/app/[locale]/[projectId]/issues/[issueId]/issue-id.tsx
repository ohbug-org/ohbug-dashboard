'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { type Issue, type OhbugEventLike } from 'common'
import { type IssueTrend } from '~/services/issues'
import EventDetailActions from '~/components/event-detail-action'
import EventDetailProfile from '~/components/event-detail-profile'
import EventDetailStack from '~/components/event-detail-stack'
import IssueDetailTitle from '~/components/issue-detail-title'
import EventDetailTrend from '~/components/event-detail-trend'
import EventDetailUser from '~/components/event-detail-user'
import IssueRelatedEvents from '~/components/issue-related-events'
import IssueRelatedMetadata from '~/components/issue-related-metadata'

const IssueRelatedRrweb = dynamic(
  () => {
    return import('~/components/issue-related-rrweb')
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
    <div className="flex flex-col gap-6">
      <IssueDetailTitle
        event={event}
        issue={issue}
      />

      {nodes}
    </div>
  )
}

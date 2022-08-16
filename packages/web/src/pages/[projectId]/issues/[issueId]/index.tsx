import type { GetServerSideProps, NextPage } from 'next'
import type { Issue, OhbugEventLike } from 'common'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import EventDetailActions from '~/components/eventDetailAction'
import EventDetailProfile from '~/components/eventDetailProfile'
import EventDetailStack from '~/components/eventDetailStack'
import IssueDetailTitle from '~/components/issueDetailTitle'
import EventDetailTrend from '~/components/eventDetailTrend'
import EventDetailUser from '~/components/eventDetailUser'
import IssueRelatedEvents from '~/components/issueRelatedEvents'
import { serviceGetEvent } from '~/services/events'
import type { IssueTrend } from '~/services/issues'
import { serviceGetIssue, serviceGetIssuesTrends } from '~/services/issues'
import IssueRelatedRrweb from '~/components/issueRelatedRrweb'
import IssueRelatedMetadata from '~/components/issueRelatedMetadata'

interface Props {
  issue: Issue
  event: OhbugEventLike
  trends: {
    '14d': IssueTrend[]
    '24h': IssueTrend[]
  }
}

export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
  const issueId = context.query.issueId as string
  const eventId = context.query.eventId as string
  const issue = await serviceGetIssue({ id: issueId }) as unknown as Issue
  const event = (await serviceGetEvent({ id: eventId, issueId }))!
  const trends14d = await serviceGetIssuesTrends({ ids: issueId, type: '14d' })
  const trends24h = await serviceGetIssuesTrends({ ids: issueId, type: '24h' })
  return {
    props: {
      issue,
      event,
      trends: {
        '14d': trends14d[issueId],
        '24h': trends24h[issueId],
      },
    },
  }
}

const Detail: NextPage<Props> = ({ issue, event, trends }) => {
  const router = useRouter()
  const tab = router.query.tab as string

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

export default Detail

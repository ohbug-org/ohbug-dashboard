import type { GetServerSideProps, NextPage } from 'next'
import type { Issue, OhbugEventLike } from 'types'
import Breadcrumb from '~/components/breadcrumb'
import IssueDetailActions from '~/components/issueDetailAction'
import IssueDetailProfile from '~/components/issueDetailProfile'
import IssueDetailStack from '~/components/issueDetailStack'
import IssueDetailTabs from '~/components/issueDetailTabs'
import IssueDetailTitle from '~/components/issueDetailTitle'
import IssueDetailTrend from '~/components/issueDetailTrend'
import { serviceGetEvent } from '~/services/events'
import type { Trend } from '~/services/issues'
import { serviceGetIssue, serviceGetIssuesTrends } from '~/services/issues'

interface Props {
  issue: Issue
  event: OhbugEventLike
  trends: {
    '14d': Trend[]
    '24h': Trend[]
  }
}

export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
  const issueId = context.query.id as string
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
  return (
    <div>
      <Breadcrumb />

      <IssueDetailTitle issue={issue} />

      <IssueDetailTabs />

      <IssueDetailProfile event={event} />

      <IssueDetailStack event={event} />

      <IssueDetailActions event={event} />

      <IssueDetailTrend
        issue={issue}
        trends={trends}
      />
    </div>
  )
}

export default Detail

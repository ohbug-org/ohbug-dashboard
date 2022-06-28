import type { GetServerSideProps, NextPage } from 'next'
import type { Issue, OhbugEventLike } from 'common'
import IssueDetailActions from '~/components/issueDetailAction'
import IssueDetailProfile from '~/components/issueDetailProfile'
import IssueDetailStack from '~/components/issueDetailStack'
import IssueDetailTabs from '~/components/issueDetailTabs'
import IssueDetailTitle from '~/components/issueDetailTitle'
import IssueDetailTrend from '~/components/issueDetailTrend'
import Wrapper from '~/components/wrapper'
import { serviceGetEvent } from '~/services/events'
import type { IssueTrend } from '~/services/issues'
import { serviceGetIssue, serviceGetIssuesTrends } from '~/services/issues'

interface Props {
  issue: Issue
  event: OhbugEventLike
  trends: {
    '14d': IssueTrend[]
    '24h': IssueTrend[]
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
    <Wrapper>
      <IssueDetailTitle issue={issue} />

      <IssueDetailTabs />

      <IssueDetailProfile event={event} />

      <IssueDetailStack event={event} />

      <IssueDetailActions event={event} />

      <IssueDetailTrend
        issue={issue}
        trends={trends}
      />
    </Wrapper>
  )
}

export default Detail

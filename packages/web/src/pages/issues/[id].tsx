import type { GetServerSideProps, NextPage } from 'next'
import type { Issue, OhbugEventLike } from 'types'
import IssueDetailActions from '~/components/issueDetailAction'
import IssueDetailProfile from '~/components/issueDetailProfile'
import IssueDetailStack from '~/components/issueDetailStack'
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
  const id = context.query.id as string
  const issue = await serviceGetIssue({ id }) as unknown as Issue
  const event = await serviceGetEvent({ issueId: id }) as unknown as OhbugEventLike
  const trends14d = await serviceGetIssuesTrends({ ids: id, type: '14d' })
  const trends24h = await serviceGetIssuesTrends({ ids: id, type: '24h' })
  return {
    props: {
      issue,
      event,
      trends: {
        '14d': trends14d[id],
        '24h': trends24h[id],
      },
    },
  }
}

const Detail: NextPage<Props> = ({ issue, event, trends }) => {
  return (
    <div>
      <IssueDetailTitle issue={issue} />

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

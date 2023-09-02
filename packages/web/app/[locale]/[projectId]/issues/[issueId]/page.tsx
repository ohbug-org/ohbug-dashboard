import { type Issue } from 'common'
import IssueId from './issue-id'
import { serviceGetEvent } from '~/services/events'
import { serviceGetIssue, serviceGetIssuesTrends } from '~/services/issues'

export default async function IssueIdPage({ params }: { params: { issueId: string; eventId: string } }) {
  const issueId = params.issueId
  const eventId = params.eventId
  const issue = await serviceGetIssue({ id: issueId }) as unknown as Issue
  const event = (await serviceGetEvent({ id: eventId, issueId }))!
  const trends14d = await serviceGetIssuesTrends({ ids: issueId, type: '14d' })
  const trends24h = await serviceGetIssuesTrends({ ids: issueId, type: '24h' })

  return (
    <IssueId
      event={event}
      issue={issue}
      trends={{
        '14d': trends14d[issueId],
        '24h': trends24h[issueId],
      }}
    />
  )
}

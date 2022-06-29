import type { GetServerSideProps, NextPage } from 'next'
import type { Issue } from 'common'
import EventsList from '~/components/eventsList'
import IssueDetailTabs from '~/components/issueDetailTabs'
import IssueDetailTitle from '~/components/issueDetailTitle'
import Wrapper from '~/components/wrapper'
import { serviceGetIssue } from '~/services/issues'

interface Props {
  issue: Issue
}

export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
  const id = context.query.issueId as string
  const issue = await serviceGetIssue({ id, withEvents: true }) as unknown as Issue
  return { props: { issue } }
}

const Detail: NextPage<Props> = ({ issue }) => {
  return (
    <Wrapper>
      <IssueDetailTitle issue={issue} />

      <IssueDetailTabs />

      <EventsList events={issue.events} />
    </Wrapper>
  )
}

export default Detail

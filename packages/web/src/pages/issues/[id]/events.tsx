import type { GetServerSideProps, NextPage } from 'next'
import type { Issue } from 'types'
import IssueDetailEventsList from '~/components/issueDetailEventsList'
import IssueDetailTabs from '~/components/issueDetailTabs'
import IssueDetailTitle from '~/components/issueDetailTitle'
import Wrapper from '~/components/wrapper'
import { serviceGetIssue } from '~/services/issues'

interface Props {
  issue: Issue
}

export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
  const id = context.query.id as string
  const issue = await serviceGetIssue({ id, withEvents: true }) as unknown as Issue
  return { props: { issue } }
}

const Detail: NextPage<Props> = ({ issue }) => {
  return (
    <Wrapper>
      <IssueDetailTitle issue={issue} />

      <IssueDetailTabs />

      <IssueDetailEventsList events={issue.events} />
    </Wrapper>
  )
}

export default Detail

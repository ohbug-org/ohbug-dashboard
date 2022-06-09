import type { GetServerSideProps, NextPage } from 'next'
import type { Issue } from 'types'
import Breadcrumb from '~/components/breadcrumb'
import IssueDetailEventsList from '~/components/issueDetailEventsList'
import IssueDetailTabs from '~/components/issueDetailTabs'
import IssueDetailTitle from '~/components/issueDetailTitle'
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
    <div>
      <Breadcrumb />

      <IssueDetailTitle issue={issue} />

      <IssueDetailTabs />

      <IssueDetailEventsList events={issue.events} />
    </div>
  )
}

export default Detail

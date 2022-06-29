import type { GetServerSideProps, NextPage } from 'next'
import type { Issue } from 'common'
import EventsList from '~/components/eventsList'
import IssueDetailTitle from '~/components/issueDetailTitle'
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
    <>
      <IssueDetailTitle issue={issue} />

      <EventsList events={issue.events} />
    </>
  )
}

export default Detail

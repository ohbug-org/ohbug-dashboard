import type { GetServerSideProps, NextPage } from 'next'
import type { Issue } from 'types'
import IssueList from '~/components/issueList'
import { serviceGetIssues } from '~/services/issues'

interface Props {
  issues: Issue[]
}

export const getServerSideProps: GetServerSideProps<Props> = async() => {
  const issues = await serviceGetIssues({
    skip: 0,
    take: 100,
  }) as unknown as Issue[]
  return { props: { issues } }
}

const Issues: NextPage<Props> = ({ issues }) => {
  return (
    <div className="p-4">
      <IssueList
        issues={issues}
      />
    </div>
  )
}

export default Issues
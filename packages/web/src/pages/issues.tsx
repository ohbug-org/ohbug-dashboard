import type { GetServerSideProps, NextPage } from 'next'
import type { Issue } from 'types'
import useSWR from 'swr'
import IssueList from '~/components/issueList'
import type { serviceGetIssuesTrendsReturn } from '~/services/issues'
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
  const { data: trends } = useSWR<serviceGetIssuesTrendsReturn>(`/api/trends?ids=${issues.map(issue => `'${issue.id}'`)}&type=24h`)

  return (
    <div className="p-4">
      <IssueList
        issues={issues}
        trends={trends}
      />
    </div>
  )
}

export default Issues

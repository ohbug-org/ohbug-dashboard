import type { GetServerSideProps, NextPage } from 'next'
import type { Issue } from 'types'
import IssueList from '~/components/issueList'
import { serviceGetIssues } from '~/services/issues'

interface Props {
  data: Issue[]
}

export const getServerSideProps: GetServerSideProps<Props> = async() => {
  const data = await serviceGetIssues({
    skip: 0,
    take: 100,
  }) as unknown as Issue[]

  return { props: { data } }
}

const Issues: NextPage<Props> = ({ data }) => {
  return (
    <div className="p-4">
      <IssueList data={data} />
    </div>
  )
}

export default Issues

import { Issue } from '@prisma/client'
import type { GetServerSideProps, NextPage } from 'next'
import IssueList from '~/components/issueList'
import { serviceGetIssues } from '~/services/issues'

interface Props {
  data: Issue[]
}

export const getServerSideProps: GetServerSideProps<Props> = async() => {
  const data = await serviceGetIssues({
    skip: 0,
    take: 100,
  })

  return { props: { data } }
}

const Issues: NextPage<Props> = ({ data }) => {
  return (
    <div>
      <IssueList data={data} />
    </div>
  )
}

export default Issues

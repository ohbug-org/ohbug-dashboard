import { Issue } from '@prisma/client'
import type { GetServerSideProps, NextPage } from 'next'
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

const Issues: NextPage<Props> = () => {
  return <div>issues</div>
}

export default Issues

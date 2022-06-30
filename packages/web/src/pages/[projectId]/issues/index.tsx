import type { NextPage } from 'next'
import { useMemo, useState } from 'react'
import useSWR from 'swr'
import IssueList from '~/components/issueList'
import Loading from '~/components/loading'
import Pagination from '~/components/pagination'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/useCurrentProject'

const Issues: NextPage = () => {
  const { projectId } = useCurrentProject()
  const [page, setPage] = useState(() => 1)
  const { data: issuesAndTotal } = useSWR(projectId ? `/api/issues?projectId=${projectId}&page=${page}` : null)
  const [issues, total] = issuesAndTotal || []
  const loading = useMemo(() => !issues, [issues])

  return (
    <Wrapper>
      {
        loading
          ? <Loading />
          : (
            <>
              <IssueList
                issues={issues}
              />
              <Pagination
                mt="6"
                onChange={page => setPage(page)}
                page={page}
                total={total}
              />
            </>
          )
      }
    </Wrapper>
  )
}

export default Issues

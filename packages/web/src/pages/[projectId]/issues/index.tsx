import type { Issue } from 'common'
import type { NextPage } from 'next'
import { useMemo, useState } from 'react'
import useSWR from 'swr'
import EmptyIssues from '~/components/emptyIssues'
import IssueList from '~/components/issueList'
import Loading from '~/components/loading'
import Pagination from '~/components/pagination'
import ThemeBox from '~/components/themeBox'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/useCurrentProject'

const Issues: NextPage = () => {
  const { projectId } = useCurrentProject()
  const [page, setPage] = useState(() => 1)
  const { data: issuesAndTotal } = useSWR<[Issue[], number]>(projectId ? `/api/issues?projectId=${projectId}&page=${page}` : null)
  const [issues, total] = issuesAndTotal || []
  const loading = useMemo(() => !issues, [issues])

  return (
    <ThemeBox bg="current">
      <Wrapper>
        {
          loading
            ? <Loading />
            : (
              <>
                <IssueList
                  empty={<EmptyIssues />}
                  issues={issues!}
                />
                <Pagination
                  mt="6"
                  onChange={page => setPage(page)}
                  page={page}
                  total={total!}
                />
              </>
            )
        }
      </Wrapper>
    </ThemeBox>
  )
}

export default Issues

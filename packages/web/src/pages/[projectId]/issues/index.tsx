import type { NextPage } from 'next'
import { useMemo } from 'react'
import useSWR from 'swr'
import IssueList from '~/components/issueList'
import Loading from '~/components/loading'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/useCurrentProject'

const Issues: NextPage = () => {
  const { projectId } = useCurrentProject()
  const { data: issues } = useSWR(`/api/issues?projectId=${projectId}`)
  const loading = useMemo(() => !issues, [issues])

  return (
    <Wrapper>
      {
        loading
          ? <Loading />
          : (
            <IssueList
              issues={issues}
            />
          )
      }

    </Wrapper>
  )
}

export default Issues

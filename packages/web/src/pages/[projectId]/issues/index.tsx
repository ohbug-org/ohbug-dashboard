import type { Issue } from 'common'
import type { NextPage } from 'next'
import EmptyIssues from '~/components/emptyIssues'
import IssueList from '~/components/issueList'
import Loading from '~/components/loading'
import Pagination from '~/components/pagination'
import ThemeBox from '~/components/themeBox'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/useCurrentProject'
import { useInfinite } from '~/hooks/useInfinite'
import { serviceGetIssues } from '~/services/issues'

const Issues: NextPage = () => {
  const { projectId } = useCurrentProject()
  const { data, size, setSize, isLoading, isReachingEnd } = useInfinite<Issue>(
    index => serviceGetIssues({
      page: index + 1,
      projectId: projectId!,
    }),
    { enabled: projectId !== undefined },
  )

  return (
    <ThemeBox bg="current">
      <Wrapper>
        {
          isLoading
            ? <Loading />
            : (
              <>
                <IssueList
                  empty={<EmptyIssues />}
                  issues={data}
                />
                <Pagination
                  isReachingEnd={!!isReachingEnd}
                  mt="6"
                  onChange={page => setSize(page - 1)}
                  page={size + 1}
                />
              </>
            )
        }
      </Wrapper>
    </ThemeBox>
  )
}

export default Issues

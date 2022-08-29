import { Box, Select } from '@chakra-ui/react'
import type { Issue } from 'common'
import type { NextPage } from 'next'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import EmptyIssues from '~/components/emptyIssues'
import IssueList from '~/components/issueList'
import Loading from '~/components/loading'
import Pagination from '~/components/pagination'
import ThemeBox from '~/components/themeBox'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/useCurrentProject'
import { useInfinite } from '~/hooks/useInfinite'
import type { SearchIssuesOrderBy } from '~/services/issues'
import { serviceGetIssues } from '~/services/issues'

const Issues: NextPage = () => {
  const t = useTranslations('Issues')
  const { projectId } = useCurrentProject()
  const [orderBy, setOrderBy] = useState<SearchIssuesOrderBy>('updatedAt')
  const { data, size, setSize, isLoading, isReachingEnd } = useInfinite<Issue>(
    index => serviceGetIssues({
      page: index + 1,
      projectId: projectId!,
      orderBy,
    }),
    {
      enabled: projectId !== undefined,
      deps: [projectId, orderBy],
      pagination: true,
    },
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
                  title={
                    (
                      <Box>
                        <Select
                          onChange={e => setOrderBy(e.target.value as SearchIssuesOrderBy)}
                          size="sm"
                          w="40"
                        >
                          <option value="updatedAt">{t('orderByUpdatedAt')}</option>
                          <option value="createdAt">{t('orderByCreatedAt')}</option>
                          <option value="events">{t('orderByEvents')}</option>
                          <option value="users">{t('orderByUsers')}</option>
                        </Select>
                      </Box>
                    )
                  }
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

import type { Issue } from 'common'
import { useMemo, useState } from 'react'
import { useDebounce } from 'react-use'
import useCurrentProject from './useCurrentProject'
import { useInfinite } from './useInfinite'
import { useSearchBarActions } from './useSearchBarActions'
import { serviceGetIssues } from '~/services/issues'

export function useIssuesSearch(query: string) {
  const { projectId } = useCurrentProject()
  const { actions } = useSearchBarActions()

  const [debouncedQuery, setDebouncedQuery] = useState(query)
  useDebounce(
    () => {
      setDebouncedQuery(query)
    },
    1500,
    [query],
  )
  const isAction = useMemo(
    () => actions.some(action => (action.label === debouncedQuery || action.label === query)),
    [debouncedQuery, query, actions],
  )
  const { data, error, isLoading } = useInfinite<Issue>(
    index => serviceGetIssues({
      page: index + 1,
      projectId: projectId!,
      query: debouncedQuery,
    }),
    { enabled: !!(projectId && debouncedQuery && !isAction) },
  )

  return {
    data,
    error,
    isLoading,
  }
}

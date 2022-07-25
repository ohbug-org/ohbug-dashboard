import type { Issue } from 'common'
import { useMemo, useState } from 'react'
import { useDebounce } from 'react-use'
import useSWR from 'swr'
import useCurrentProject from './useCurrentProject'
import { useSearchBarActions } from './useSearchBarActions'

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
  const { data: issuesAndTotal, error } = useSWR<[Issue[], number]>((projectId && debouncedQuery && !isAction)
    ? `/api/issues?projectId=${projectId}&query=${debouncedQuery}`
    : null)
  const [data] = issuesAndTotal || []
  const loading = useMemo(
    () => !issuesAndTotal && !error && !!query && !isAction,
    [issuesAndTotal, error, query, isAction],
  )

  return {
    data,
    error,
    loading,
  }
}

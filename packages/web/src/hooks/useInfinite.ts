import { PAGE_SIZE } from 'common'
import { useMemo } from 'react'
import type { SWRInfiniteKeyLoader } from 'swr/infinite'
import useSWRInfinite from 'swr/infinite'

export function useInfinite<T = any>(keyLoading: SWRInfiniteKeyLoader) {
  const { data, error, size, setSize } = useSWRInfinite<T[]>(keyLoading)
  const isEmpty = data?.[0]?.length === 0
  const isLoadingInitialData = !data && !error
  const isLoading = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
  const result = useMemo(() => data?.flat() ?? [], [data])

  return {
    originalData: data,
    data: result,
    isLoading,
    error,
    size,
    setSize,
    isEmpty,
    isLoadingInitialData,
    isReachingEnd,
  }
}

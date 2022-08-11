import { PAGE_SIZE } from 'common'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface State<T> {
  isLoading: boolean
  error?: Error
  data?: T[]
  result?: T[][]
  size: number
}
interface Options {
  enabled: boolean
}

export function useInfinite<T = any>(
  keyLoading: (index: number) => (Promise<T[]>),
  options?: Options,
) {
  const { enabled = true } = options ?? {}
  const lastCallId = useRef(0)
  const [state, set] = useState<State<T>>({ isLoading: false, size: 0 })
  const mutate = useCallback(() => {
    const callId = ++lastCallId.current
    set(prevState => ({
      ...prevState,
      isLoading: true,
    }))
    return keyLoading(state.size)
      .then((res) => {
        callId === lastCallId.current && set(prevState => ({
          ...prevState,
          data: prevState.data ? [...prevState.data, ...res] : res,
          result: prevState.result ? [...prevState.result, res] : [res],
          isLoading: false,
        }))
        return res
      })
      .catch((err) => {
        callId === lastCallId.current && set(prevState => ({
          ...prevState,
          error: err,
          isLoading: false,
        }))
        return err
      })
  }, [keyLoading, state.size])
  useEffect(() => {
    if (enabled) {
      mutate()
    }
  }, [enabled, state.size])
  const isEmpty = useMemo(() => state.result?.[0]?.length === 0, [state.result])
  const isReachingEnd = useMemo(
    () => isEmpty || (state.result && state.result[state.result.length - 1]?.length < PAGE_SIZE),
    [isEmpty, state.result],
  )
  const setSize = useCallback((value: number) => {
    set(prevState => ({ ...prevState, size: value }))
  }, [])

  return {
    ...state,
    setSize,
    isEmpty,
    isReachingEnd,
    mutate,
  }
}

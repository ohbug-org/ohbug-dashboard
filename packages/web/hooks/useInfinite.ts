import { PAGE_SIZE } from 'common'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

interface State<T> {
  isLoading: boolean
  error?: Error
  data?: T[]
  result?: T[][]
  size: number
}
interface Options {
  enabled: boolean
  deps?: any[]
  pagination?: boolean
}
const initialState: State<any> = { isLoading: false, size: 0 }
export function useInfinite<T = any>(
  keyLoading: (index: number) => (Promise<T[]>),
  options?: Options,
) {
  const { enabled = true, deps = [], pagination = false } = options ?? {}
  const lastCallId = useRef(0)
  const [state, set] = useState<State<T>>(initialState)
  const reset = useCallback(() => set(initialState), [])
  const mutate = useCallback(() => {
    const callId = ++lastCallId.current
    flushSync(() => {
      set(prevState => ({
        ...prevState,
        isLoading: true,
      }))
    })
    return keyLoading(state.size)
      .then((res) => {
        callId === lastCallId.current && set(prevState => ({
          ...prevState,
          data: !pagination
            ? prevState.data
              ? res.length
                ? [...prevState.data, ...res]
                : res
              : res
            : res,
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
  }, [keyLoading, state.size, pagination, ...deps])
  useEffect(() => {
    if (enabled) {
      mutate()
    }
  }, [enabled, state.size, ...deps])
  useEffect(() => {
    reset()
  }, deps)
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
    reset,
    isEmpty,
    isReachingEnd,
    mutate,
  }
}

import { useToast } from '@chakra-ui/react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface State<T> {
  isLoading: boolean
  error?: Error
  data?: T
}
interface Options {
  enabled?: boolean
  deps?: any[]
}

export function useQuery<T = any>(
  fn: () => (Promise<T>),
  options?: Options,
) {
  const toast = useToast()
  const { enabled = true, deps = [] } = options ?? {}
  const lastCallId = useRef(0)
  const [state, set] = useState<State<T>>({ isLoading: false })
  const mutate = useCallback(() => {
    const callId = ++lastCallId.current
    set(prevState => ({
      ...prevState,
      isLoading: true,
    }))
    return fn()
      .then((res) => {
        if (callId === lastCallId.current) {
          set(prevState => ({
            ...prevState,
            data: res,
            isLoading: false,
          }))
        }
        return res
      })
      .catch((err) => {
        if (callId === lastCallId.current) {
          set(prevState => ({
            ...prevState,
            error: err,
            isLoading: false,
          }))
          toast({
            title: 'Error',
            description: err.message,
            status: 'error',
          })
        }
        return err
      })
  }, [fn, ...deps])
  useEffect(() => {
    if (enabled) {
      mutate()
    }
  }, [enabled, ...deps])

  return {
    ...state,
    mutate,
  }
}

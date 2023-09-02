import { useCallback, useEffect, useRef, useState } from 'react'
import { useToast } from '~/components/ui/use-toast'

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
  const { toast } = useToast()
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
      .catch((error) => {
        if (callId === lastCallId.current) {
          set(prevState => ({
            ...prevState,
            error,
            isLoading: false,
          }))
          toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
          })
        }
        return error
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

'use client'

import { useCallback } from 'react'
import { Button } from '~/components/ui/button'

interface Props {
  page: number
  onChange: (page: number) => void
  isReachingEnd: boolean
}

export default function Pagination({ page = 1, onChange, isReachingEnd, ...props }: Props) {
  const handlePrev = useCallback(() => {
    const _page = page - 1
    const value = _page > 0 ? _page : 1
    onChange(value)
  }, [page])
  const handleNext = useCallback(() => {
    const _page = page + 1
    const value = _page > 0 ? _page : 1
    onChange(value)
  }, [page])

  return (
    <div
      className='flex items-center justify-end gap-2'
      {...props}
    >
      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={handlePrev}
        disabled={page <= 1}
      >
        <span className="sr-only">Go to previous page</span>
        <i className="i-ri-arrow-left-s-line" />
      </Button>
      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        disabled={isReachingEnd}
        onClick={handleNext}
    >
        <span className="sr-only">Go to next page</span>
        <i className="i-ri-arrow-right-s-line" />
      </Button>
    </div>
  )
}

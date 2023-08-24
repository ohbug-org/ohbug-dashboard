'use client'

import { Button } from '~/components/ui/button'
import type { MouseEventHandler } from 'react'

interface Props {
  isLoading?: boolean
  isReachingEnd?: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function LoadingMoreButton({ isLoading, isReachingEnd, onClick }: Props) {
  return (
    <Button
      className="w-full mt-6"
      disabled={isLoading || isReachingEnd}
      onClick={onClick}
      size="sm"
    >
      {
        isLoading
          ? 'Loading...'
          : isReachingEnd
            ? 'No More Events'
            : 'Load More'
      }
    </Button>
  )
}

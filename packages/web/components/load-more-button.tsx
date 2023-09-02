'use client'

import { type MouseEventHandler } from 'react'
import { Button } from '~/components/ui/button'

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
      size="sm"
      variant="outline"
      onClick={onClick}
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

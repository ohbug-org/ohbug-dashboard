import { Button } from '@chakra-ui/react'
import type { FC, MouseEventHandler } from 'react'

interface Props {
  isLoading?: boolean
  isReachingEnd?: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

const LoadingMoreButton: FC<Props> = ({ isLoading, isReachingEnd, onClick }) => {
  return (
    <Button
      disabled={isLoading || isReachingEnd}
      mt="6"
      onClick={onClick}
      size="sm"
      variant="outline"
      w="full"
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

export default LoadingMoreButton

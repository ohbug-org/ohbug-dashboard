'use client'

import type { FlexProps } from '@chakra-ui/react'
import { ButtonGroup, Flex, IconButton } from '@chakra-ui/react'
import type { FC } from 'react'
import { useCallback } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

interface Props extends Omit<FlexProps, 'onChange'> {
  page: number
  onChange: (page: number) => void
  isReachingEnd: boolean
}

const Pagination: FC<Props> = ({ page = 1, onChange, isReachingEnd, ...props }) => {
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
    <Flex
      align="center"
      gap="4"
      justify="end"
      {...props}
    >
      <ButtonGroup
        isAttached
        size="sm"
        variant="outline"
      >
        <IconButton
          aria-label="left"
          cursor="pointer"
          disabled={page <= 1}
          icon={<RiArrowLeftSLine />}
          onClick={handlePrev}
        />
        <IconButton
          aria-label="right"
          cursor="pointer"
          disabled={isReachingEnd}
          icon={<RiArrowRightSLine />}
          onClick={handleNext}
        />
      </ButtonGroup>
    </Flex>
  )
}

export default Pagination

'use client'

import type { BoxProps } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { forwardRef, useMemo } from 'react'
import { useBgColor, useBorderColor } from '~/hooks/useColor'

export interface ThemeBoxProps extends BoxProps {
  acrylic?: boolean
}

const ThemeBox = forwardRef<HTMLDivElement, ThemeBoxProps>(({ acrylic, ...props }, ref) => {
  const bgColor = useBgColor({ acrylic })
  const bgGrayColor = useBgColor({ gray: true })
  const borderColor = useBorderColor()

  const bg = useMemo(() => {
    if (props.bg === 'current') return bgColor
    else if (props.bg === 'gray') return bgGrayColor
    return props.bg
  }, [props.bg, bgColor, bgGrayColor])

  return (
    <Box
      {...props}
      backdropFilter={acrylic ? 'saturate(100%) blur(10px)' : undefined}
      bg={bg}
      borderColor={props.borderColor === 'current' ? borderColor : props.borderColor}
      ref={ref}
    />
  )
})
ThemeBox.displayName = 'ThemeBox'
export default ThemeBox

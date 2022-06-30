import type { BoxProps } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import type { FC } from 'react'
import { useMemo } from 'react'
import { useBgColor, useBorderColor } from '~/hooks/useColor'

export interface ThemeBoxProps extends BoxProps {
  acrylic?: boolean
}

const ThemeBox: FC<ThemeBoxProps> = (props) => {
  const bgColor = useBgColor({ acrylic: props.acrylic })
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
      backdropFilter={props.acrylic ? 'saturate(180%) blur(5px)' : undefined}
      bg={bg}
      borderColor={props.borderColor === 'current' ? borderColor : props.borderColor}
    />
  )
}

export default ThemeBox

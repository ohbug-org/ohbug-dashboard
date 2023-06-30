'use client'

import type { BoxProps } from '@chakra-ui/react'
import { Box, useColorMode } from '@chakra-ui/react'
import { forwardRef } from 'react'
import Image from 'next/image'

interface Props extends BoxProps {}

const Logo = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { colorMode } = useColorMode()
  return (
    <Box
      as="a"
      cursor="pointer"
      display="inline-block"
      h="16"
      position="relative"
      ref={ref}
      w="16"
      {...props}
    >
      <Image
        alt="logo"
        fill
        priority
        src={colorMode === 'dark' ? '/logo-white.svg' : '/logo.svg'}
      />
    </Box>
  )
})
Logo.displayName = 'Logo'
export default Logo

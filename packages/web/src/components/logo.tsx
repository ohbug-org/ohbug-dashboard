import type { BoxProps } from '@chakra-ui/react'
import { Box, useColorMode } from '@chakra-ui/react'
import type { FC } from 'react'
import Image from 'next/image'

interface Props extends BoxProps {}

const Logo: FC<Props> = (props) => {
  const { colorMode } = useColorMode()
  return (
    <Box
      as="a"
      cursor="pointer"
      display="inline-block"
      h="16"
      position="relative"
      w="16"
      {...props}
    >
      <Image
        alt="logo"
        layout="fill"
        src={colorMode === 'dark' ? '/logo-white.svg' : '/logo.svg'}
      />
    </Box>
  )
}

export default Logo

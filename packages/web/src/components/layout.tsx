import { Box, Flex } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'
import Nav from './nav'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Flex
      as="main"
      h="inherit"
    >
      <Flex as="nav">
        <Nav />
      </Flex>
      <Box>
        <Box>{children}</Box>
        <Box>footer</Box>
      </Box>
    </Flex>
  )
}

export default Layout

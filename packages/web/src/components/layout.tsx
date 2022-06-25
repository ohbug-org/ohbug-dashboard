import { Box, Flex } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'
import { useState } from 'react'
import Nav from './nav'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Flex
      as="main"
      h="full"
      w="full"
    >
      <Flex
        as="nav"
        h="full"
        left="0"
        position="fixed"
        top="0"
        transition="width 300ms ease"
        w={collapsed ? '70px' : '220px'}
        zIndex="sticky"
      >
        <Nav
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </Flex>
      <Box
        bg="gray.50"
        ml={collapsed ? '70px' : '220px'}
        p="4"
        transition="margin 300ms ease"
        w="full"
      >
        <Box>{children}</Box>
        <Box>footer</Box>
      </Box>
    </Flex>
  )
}

export default Layout

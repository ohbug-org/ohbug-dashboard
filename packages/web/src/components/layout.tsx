import { Box, Container, Flex } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'
import { useState } from 'react'
import { useIsomorphicLayoutEffect, useWindowScroll } from 'react-use'
import Image from 'next/image'
import Nav from './nav'
import NavMenu from './navMenu'
import User from './user'
import { scrollWindowTo } from '~/libs/utils'

const HeadHeight = 64
const NavHeight = 48

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const { y } = useWindowScroll()
  const [scrollNavVisible, setScrollNavVisible] = useState(false)
  useIsomorphicLayoutEffect(() => {
    setScrollNavVisible(y > HeadHeight)
  }, [y])

  return (
    <Box
      as="main"
      minH="full"
      w="full"
    >
      <Container
        as="nav"
        h={`${HeadHeight}px`}
        maxW="container.xl"
      >
        <Nav />
      </Container>
      <Box
        bg="white"
        borderBottom="1px"
        borderBottomColor="gray.200"
        h={`${NavHeight}px`}
        position={scrollNavVisible ? 'sticky' : 'relative'}
        top={scrollNavVisible ? 0 : ''}
        w="full"
        zIndex={scrollNavVisible ? 'sticky' : ''}
      >
        <Container
          alignItems="center"
          as="nav"
          display="flex"
          h="full"
          justifyContent="space-between"
          maxW="container.xl"
        >
          <Flex position="relative">
            <Box
              cursor="pointer"
              display="inline-block"
              h={`${NavHeight}px`}
              onClick={() => scrollWindowTo()}
              opacity={scrollNavVisible ? 1 : 0}
              position="relative"
              transform={scrollNavVisible ? 'translateZ(0)' : `translate3d(0,-${NavHeight}px,0)`}
              transition="all 250ms ease"
              visibility={scrollNavVisible ? 'visible' : 'hidden'}
              w={`${NavHeight}px`}
            >
              <Image
                alt="logo"
                layout="fill"
                src="/logo.svg"
              />
            </Box>

            <Box
              transform={scrollNavVisible ? 'translate3d(24px,0,0)' : `translate3d(-${NavHeight + 12}px,0,0)`}
              transition="all 250ms ease"
            >
              <NavMenu />
            </Box>
          </Flex>

          <Box
            opacity={scrollNavVisible ? 1 : 0}
            transform={scrollNavVisible ? 'translateZ(0)' : `translate3d(0,-${NavHeight}px,0)`}
            transition="all 250ms ease"
            visibility={scrollNavVisible ? 'visible' : 'hidden'}
          >
            <User />
          </Box>
        </Container>
      </Box>
      <Box
        bg="gray.50"
        minH={`calc(100vh - ${HeadHeight + NavHeight}px)`}
        w="full"
      >
        <Container
          maxW="container.xl"
          p="4"
        >
          <Box>{children}</Box>
        </Container>
      </Box>
      <Box
        borderTop="1px"
        borderTopColor="gray.200"
      >
        <Container
          as="footer"
          maxW="container.xl"
        >
        footer
        </Container>
      </Box>
    </Box>
  )
}

export default Layout

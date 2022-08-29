import { Box, Button, Flex } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'
import NextLink from 'next/link'

export interface Nav {
  label: string
  href: string
  active: boolean
}
interface Props {
  children: ReactNode
  navs: Nav[]
}

const NavContainer: FC<Props> = ({ children, navs }) => {
  return (
    <Flex
      display="flex"
      justifyContent="space-between"
    >
      <Box>
        {
          navs.map(nav => (
            <NextLink
              href={nav.href}
              key={nav.href}
              passHref
            >
              <Button
                fontWeight={nav.active ? 'bold' : 'normal'}
                variant="ghost"
              >
                {nav.label}
              </Button>
            </NextLink>
          ))
        }
      </Box>
      <Box>{children}</Box>
    </Flex>
  )
}

export default NavContainer

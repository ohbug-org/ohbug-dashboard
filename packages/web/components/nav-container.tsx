'use client'

import { Box, Button, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import type { FC, ReactNode } from 'react'

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
            <Link
              href={nav.href}
              key={nav.href}
            >
              <Button
                fontWeight={nav.active ? 'bold' : 'normal'}
                variant="ghost"
              >
                {nav.label}
              </Button>
            </Link>
          ))
        }
      </Box>
      <Box>{children}</Box>
    </Flex>
  )
}

export default NavContainer

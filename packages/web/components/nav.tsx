'use client'

import type { FC } from 'react'
import { Flex } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import User from './user'
import Breadcrumbs from './breadcrumbs'
import ThemeBox from './themeBox'

interface Props {}

const Nav: FC<Props> = () => {
  return (
    <ThemeBox
      alignItems="center"
      bg="current"
      display="flex"
      h="full"
      justifyContent="space-between"
      w="full"
    >
      <Breadcrumbs />

      <Flex
        align="center"
        gap="4"
      >
        <Link
          href="https://ohbug.net/"
          target="_blank"
        >
          Docs
        </Link>
        <User />
      </Flex>
    </ThemeBox>
  )
}

export default Nav

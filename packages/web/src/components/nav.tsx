import type { FC } from 'react'
import { Flex, Link } from '@chakra-ui/react'
import User from './user'
import Breadcrumbs from './breadcrumbs'

interface Props {}

const Nav: FC<Props> = () => {
  return (
    <Flex
      align="center"
      bg="white"
      h="full"
      justify="space-between"
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
    </Flex>
  )
}

export default Nav

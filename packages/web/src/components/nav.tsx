import type { FC } from 'react'
import { Flex, Link } from '@chakra-ui/react'
import User from './user'
import Breadcrumbs from './breadcrumbs'
import ThemeBox from './themeBox'
import SearchBar from './searchBar'

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
        <SearchBar />
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

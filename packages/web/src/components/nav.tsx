import type { FC } from 'react'
import { useCallback } from 'react'
import { Flex, Kbd, Link } from '@chakra-ui/react'
import { VisualState, useKBar } from 'kbar'
import { isMacOs } from 'react-device-detect'
import User from './user'
import Breadcrumbs from './breadcrumbs'
import ThemeBox from './themeBox'

interface Props {}

const Nav: FC<Props> = () => {
  const { query } = useKBar()
  const handleKeyboardClick = useCallback(() => {
    query.setVisualState(vs =>
      [VisualState.animatingOut, VisualState.hidden].includes(vs)
        ? VisualState.animatingIn
        : VisualState.animatingOut)
  }, [])

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
        <ThemeBox
          alignItems="center"
          bg="gray"
          cursor="pointer"
          display="flex"
          justifyContent="space-between"
          onClick={handleKeyboardClick}
          p="2"
          w="40"
        >
          <span>Search...</span>
          <Flex gap="1">
            <Kbd>
              {isMacOs ? '⌘' : '⌃'}
            </Kbd>
            <Kbd>K</Kbd>
          </Flex>
        </ThemeBox>
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

import type { Dispatch, FC, SetStateAction } from 'react'
import { useCallback } from 'react'
import { Flex, IconButton, Tooltip } from '@chakra-ui/react'
import { RiMenuFill } from 'react-icons/ri'
import Link from 'next/link'
import User from './user'
import NavMenu from './navMenu'

interface Props {
  collapsed: boolean
  setCollapsed: Dispatch<SetStateAction<boolean>>
}

const Nav: FC<Props> = ({ collapsed, setCollapsed }) => {
  const handleToggleCollapsed = useCallback(() => setCollapsed(prevState => !prevState), [])

  return (
    <Flex
      align="center"
      as="nav"
      bg="gray.50"
      direction="column"
      justify="space-between"
      p="4"
      w="full"
    >
      <Flex direction="column">
        <Tooltip
          label="Home"
          placement="right"
        >
          <Link href="/">
            <IconButton
              aria-label="logo"
              icon={
                (
                  <img
                    alt="logo"
                    src="/logo.svg"
                  />
                )
              }
              size="lg"
              variant="ghost"
            />
          </Link>
        </Tooltip>
        <Tooltip
          label="Toggle Navigation"
          placement="right"
        >
          <IconButton
            aria-label="toggle navigation"
            icon={<RiMenuFill />}
            onClick={handleToggleCollapsed}
            size="lg"
            variant="ghost"
          />
        </Tooltip>
      </Flex>

      <Flex
        direction="column"
        flex="1"
        justify="start"
        pt="8"
        w="full"
      >
        <NavMenu collapsed={collapsed} />
      </Flex>

      <User />
    </Flex>
  )
}

export default Nav

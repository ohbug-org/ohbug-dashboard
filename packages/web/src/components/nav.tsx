import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { Box, Flex, IconButton, Tooltip } from '@chakra-ui/react'
import { RiMenuFill } from 'react-icons/ri'
import User from './user'

const Nav: FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const handleToggleCollapsed = useCallback(() => setCollapsed(prevState => !prevState), [])

  return (
    <Flex
      align="center"
      as="nav"
      bg="gray.50"
      direction="column"
      justify="space-between"
      p="4"
      transition="width 300ms ease"
      w={collapsed ? '70px' : '220px'}
    >
      <Flex direction="column">
        <Tooltip
          label="Home"
          placement="right"
        >
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

      <Box>center</Box>

      <User />
    </Flex>
  )
}

export default Nav

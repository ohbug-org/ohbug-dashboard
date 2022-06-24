import type { FC } from 'react'
import { Button, Collapse, Flex, Icon, Text, Tooltip } from '@chakra-ui/react'
import { RiArchiveDrawerLine, RiFireLine, RiSettings4Line, RiTerminalBoxLine } from 'react-icons/ri'
import type { IconType } from 'react-icons'
import { useRouter } from 'next/router'

interface NavMenuItem {
  label: string
  icon: IconType
  link: string
}
const navMenuList: NavMenuItem[] = [
  {
    label: 'Projects',
    icon: RiArchiveDrawerLine,
    link: '/projects',
  },
  {
    label: 'Issues',
    icon: RiTerminalBoxLine,
    link: '/issues',
  },
  {
    label: 'Releases',
    icon: RiFireLine,
    link: '/releases',
  },
  {
    label: 'Settings',
    icon: RiSettings4Line,
    link: '/settings',
  },
]

interface Props {
  collapsed: boolean
}

const NavMenu: FC<Props> = ({ collapsed }) => {
  const router = useRouter()

  return (
    <Flex
      align="center"
      direction="column"
      justify="space-between"
      w="full"
    >
      {
        navMenuList.map((item) => {
          const active = router.route.includes(item.link)
          return (
            <Tooltip
              isDisabled={!collapsed}
              key={item.link}
              label={item.label}
              placement="right"
            >
              <Button
                alignItems="center"
                gap="4"
                justifyContent={collapsed ? 'center' : 'start'}
                onClick={() => router.push(item.link)}
                textColor={active ? 'gray.800' : 'gray.500'}
                variant={active ? 'solid' : 'ghost'}
                w="full"
              >
                <Icon
                  as={item.icon}
                  h="6"
                  w="6"
                />
                <Collapse
                  animateOpacity
                  in={!collapsed}
                  unmountOnExit
                >
                  <Text >{item.label}</Text>
                </Collapse>
              </Button>
            </Tooltip>
          )
        })
      }

    </Flex>
  )
}

export default NavMenu

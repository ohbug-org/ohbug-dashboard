import type { FC } from 'react'
import { Button, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface NavMenuItem {
  label: string
  link: string
}
const navMenuList: NavMenuItem[] = [
  {
    label: 'Projects',
    link: '/projects',
  },
  {
    label: 'Issues',
    link: '/issues',
  },
  {
    label: 'Releases',
    link: '/releases',
  },
]

const NavMenu: FC = () => {
  const router = useRouter()

  return (
    <Flex
      align="center"
      gap="4"
      h="full"
      w="full"
    >
      {
        navMenuList.map((item) => {
          const active = router.route.includes(item.link)
          return (
            <Flex
              align="center"
              borderBottom={active ? '2px' : ''}
              h="full"
              key={item.link}
            >
              <Button
                alignItems="center"
                gap="2"
                justifyContent="start"
                onClick={() => router.push(item.link)}
                size="sm"
                textColor={active ? 'gray.800' : 'gray.500'}
                variant="ghost"
              >
                <Text>{item.label}</Text>
              </Button>
            </Flex>
          )
        })
      }

    </Flex>
  )
}

export default NavMenu

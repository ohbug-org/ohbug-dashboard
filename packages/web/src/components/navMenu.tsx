import type { FC } from 'react'
import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
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
  const textColor = useColorModeValue('gray.500', 'gray.400')
  const activeTextColor = useColorModeValue('gray.800', 'gray.20')

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
                textColor={active ? activeTextColor : textColor}
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

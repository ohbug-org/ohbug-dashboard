import type { FC } from 'react'
import { useMemo } from 'react'
import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import useCurrentProject from '~/hooks/useCurrentProject'

interface NavMenuItem {
  label: string
  link: string
  as: string
}

const NavMenu: FC = () => {
  const router = useRouter()
  const textColor = useColorModeValue('gray.500', 'gray.400')
  const activeTextColor = useColorModeValue('gray.800', 'gray.20')
  const { projectId } = useCurrentProject()
  const navMenuList = useMemo<NavMenuItem[]>(() => [
    {
      label: 'Issues',
      link: '/[projectId]/issues',
      as: `/${projectId}/issues`,
    },
    {
      label: 'Releases',
      link: '/[id]/releases',
      as: `/${projectId}/releases`,
    },
  ], [projectId])

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
                onClick={() => router.push(item.link, item.as)}
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

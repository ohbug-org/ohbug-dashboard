'use client'

import type { FC } from 'react'
import { useMemo } from 'react'
import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next-intl/client'
import useCurrentProject from '~/hooks/useCurrentProject'

interface NavMenuItem {
  label: string
  link: string
  as: string
}

const NavMenu: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const textColor = useColorModeValue('gray.500', 'gray.400')
  const activeTextColor = useColorModeValue('gray.800', 'gray.20')
  const { projectId } = useCurrentProject()
  const navMenuList = useMemo<NavMenuItem[]>(() => [
    {
      label: 'Profile',
      link: '/[projectId]/profile',
      as: `/${projectId}/profile`,
    },
    {
      label: 'Issues',
      link: '/[projectId]/issues',
      as: `/${projectId}/issues`,
    },
    {
      label: 'Users',
      link: '/[projectId]/users',
      as: `/${projectId}/users`,
    },
    {
      label: 'Metrics',
      link: '/[projectId]/metrics',
      as: `/${projectId}/metrics`,
    },
    {
      label: 'Feedback',
      link: '/[projectId]/feedbacks',
      as: `/${projectId}/feedbacks`,
    },
    {
      label: 'Releases',
      link: '/[projectId]/releases',
      as: `/${projectId}/releases`,
    },
    {
      label: 'Alerts',
      link: '/[projectId]/alerts',
      as: `/${projectId}/alerts`,
    },
    {
      label: 'Settings',
      link: '/[projectId]/settings',
      as: `/${projectId}/settings`,
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
          const active = pathname.includes(item.as)
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
                onClick={() => router.push(item.as)}
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

'use client'

import { useCallback, useMemo } from 'react'
import { usePathname, useRouter } from 'next-intl/client'
import { Tab, Tabs } from '@nextui-org/react'
import { type FC, type Key } from 'react'
import useCurrentProject from '~/hooks/use-current-project'

interface NavMenuItem {
  label: string
  link: string
  as: string
}

const NavMenu: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
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

  const active = useMemo(() => {
    return navMenuList.find(item => pathname.includes(item.as))
  }, [navMenuList, pathname])
  const handleSelectionChange = useCallback((key: Key) => {
    const item = navMenuList.find(item => item.link === key)
    if (item) {
      router.push(item.as)
    }
  }, [navMenuList])

  return (
    <Tabs
      className="flex items-center gap-4 h-full w-full"
      onSelectionChange={handleSelectionChange}
      selectedKey={active?.link}
      size="lg"
      variant="light"
    >
      {
        navMenuList.map((item) => {
          return (
            <Tab
              className="flex items-center h-full"
              key={item.link}
              title={item.label}
            />
          )
        })
      }

    </Tabs>
  )
}

export default NavMenu

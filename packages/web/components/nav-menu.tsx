'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import useCurrentProject from '~/hooks/use-current-project'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '~/components/ui/navigation-menu'

interface NavMenuItem {
  label: string
  link: string
  as: string
}

export default function NavMenu() {
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
    <NavigationMenu>
      <NavigationMenuList>
        {
          navMenuList.map((item) => {
            return (
              <NavigationMenuItem key={item.link}>
                <Link
                  legacyBehavior
                  passHref
                  href={item.as}
                >
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )
          })
        }
      </NavigationMenuList>
    </NavigationMenu>
  )
}

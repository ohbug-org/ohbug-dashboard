'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Theme from './theme'
import Intl from './intl'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'

export default function UserComponent() {
  const t = useTranslations('Header.User')
  const { data: session } = useSession()

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="relative h-8 w-8 rounded-full"
            variant="outline"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                alt={session.user?.name ?? ''}
                src={session.user?.image ?? ''}
              />
              <AvatarFallback>{session.user?.name ?? ''}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{session.user?.name ?? ''}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              {t('theme')}
              <DropdownMenuShortcut><Theme /></DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {t('language')}
              <DropdownMenuShortcut><Intl /></DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              {t('logout')}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  return (
    <Button
      onClick={() => signIn()}
    >
      {t('signIn')}
    </Button>
  )
}

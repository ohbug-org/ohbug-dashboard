'use client'

import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, User } from '@nextui-org/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Theme from './theme'
import Intl from './intl'

export default function UserComponent() {
  const t = useTranslations('Header.User')
  const { data: session } = useSession()

  if (session) {
    return (
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Avatar
            as="button"
            className="transition-transform"
            name={session.user?.name ?? ''}
            size="sm"
            src={session.user?.image ?? ''}
          />
        </DropdownTrigger>

        <DropdownMenu>
          <DropdownSection
            showDivider
          >
            <DropdownItem>
              <User
                avatarProps={
                  { src: session.user?.image ?? '' }
                }
                description={session.user?.email}
                name={session.user?.name ?? ''}
              />
            </DropdownItem>
          </DropdownSection>

          <DropdownSection showDivider>
            <DropdownItem
              endContent={<Theme />}
              isReadOnly
            >
              {t('theme')}
            </DropdownItem>
          </DropdownSection>

          <DropdownSection>
            <DropdownItem
              endContent={<Intl />}
              isReadOnly
            >
              {t('language')}
            </DropdownItem>
          </DropdownSection>

          <DropdownSection>
            <DropdownItem onPress={() => signOut()}>{t('logout')}</DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
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

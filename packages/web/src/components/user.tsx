import type { FC } from 'react'
import { useMemo } from 'react'
import { Avatar, AvatarBadge, Box, Button, Flex, Highlight, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import useSWR from 'swr'
import Theme from './theme'

const User: FC = () => {
  const { data: session } = useSession()
  const { data } = useSWR('https://cdn.jsdelivr.net/gh/ohbug-org/ohbug-dashboard/package.json')
  const hasNewVersion = useMemo(() => {
    if (!data) return false
    const { version } = data
    const currentVersion = process.env.NEXT_PUBLIC_VERSION
    return version !== currentVersion
  }, [data])

  if (session) {
    return (
      <Menu>
        <MenuButton>
          <Avatar
            name={session.user?.name ?? ''}
            size="sm"
            src={session.user?.image ?? ''}
          >
            {
              hasNewVersion && (
                <AvatarBadge
                  bg="green.500"
                  boxSize="1.25em"
                />
              )
            }
          </Avatar>
        </MenuButton>

        <MenuList>
          <MenuGroup>
            <Flex
              gap="4"
              px="3"
              py="2"
            >
              <Avatar
                name={session.user?.name ?? ''}
                size="md"
                src={session.user?.image ?? ''}
              />
              <Flex direction="column">
                <Text fontWeight="semibold">{session.user?.name}</Text>
                <Text
                  fontSize="12"
                  textColor="gray.500"
                >
                  {session.user?.email}
                </Text>
              </Flex>
            </Flex>
            {
              hasNewVersion && (
                <MenuItem
                  as="a"
                  href="https://www.ohbug.net/guide/upgrade.html"
                  target="_blank"
                >
                  <Highlight
                    query="latest version"
                    styles={{ ml: '2', px: '2', py: '1', bg: 'orange.100' }}
                  >
                    Get the latest version
                  </Highlight>
                </MenuItem>
              )
            }
          </MenuGroup>

          <MenuDivider />

          <MenuGroup>
            <MenuItem>Dashboard</MenuItem>
          </MenuGroup>

          <MenuDivider />

          <MenuGroup>
            <Flex
              align="center"
              justify="space-between"
              px="3"
              py="2"
              w="full"
            >
              <Box>Theme</Box>
              <Theme />
            </Flex>
          </MenuGroup>

          <MenuDivider />

          <MenuGroup>
            <MenuItem onClick={() => signOut()}>Logout</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    )
  }
  return (
    <Button
      onClick={() => signIn()}
      size="xs"
    >
      Sign in
    </Button>
  )
}

export default User

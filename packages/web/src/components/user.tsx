import type { FC } from 'react'
import { Avatar, Box, Button, Flex, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Theme from './theme'

const User: FC = () => {
  const { data: session } = useSession()

  if (session) {
    return (
      <Menu>
        <MenuButton>
          <Avatar
            name={session.user?.name ?? ''}
            size="sm"
            src={session.user?.image ?? ''}
          />
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
                <Text fontWeight="bold">{session.user?.name}</Text>
                <Text
                  fontSize="12"
                  textColor="gray.500"
                >
                  {session.user?.email}
                </Text>
              </Flex>
            </Flex>
          </MenuGroup>

          <MenuDivider />

          <MenuGroup>
            <MenuItem>Dashboard</MenuItem>
          </MenuGroup>

          <MenuDivider />

          <MenuGroup>
            <Box
              px="3"
              py="2"
            >
              <Theme />
            </Box>
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

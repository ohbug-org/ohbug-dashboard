import type { FC } from 'react'
import { Avatar, Button, Flex, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'

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
            <MenuItem gap={4}>
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
            </MenuItem>
          </MenuGroup>

          <MenuDivider />

          <MenuGroup>
            <MenuItem>Dashboard</MenuItem>
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

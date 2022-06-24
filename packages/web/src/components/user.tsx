import type { FC } from 'react'
import { useMemo } from 'react'
import { Avatar, Box, Button, Flex, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import useSWR from 'swr'
import type { Project } from '@prisma/client'

const User: FC = () => {
  const { data: session } = useSession()
  const { data: projects } = useSWR<Project[]>('/api/projects')
  const defaultProject = useMemo(() => projects?.find(project => project.default), [projects])
  const loading = useMemo(() => !projects, [projects])
  if (loading) {
    return (
      <Box>Loading...</Box>
    )
  }

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
                name={defaultProject?.name}
                size="md"
                src={defaultProject?.image ?? ''}
              />
              <Flex direction="column">
                <Text fontWeight="bold">{defaultProject?.name}</Text>
                <Text textColor="gray.500">{defaultProject?.type}</Text>
              </Flex>
            </MenuItem>
          </MenuGroup>

          <MenuDivider />

          <MenuGroup>
            <MenuItem gap={4}>
              <Avatar
                name={session.user?.name ?? ''}
                size="md"
                src={session.user?.image ?? ''}
              />
              <Flex direction="column">
                <Text fontWeight="bold">{session.user?.name}</Text>
                <Text textColor="gray.500">{session.user?.email}</Text>
              </Flex>
            </MenuItem>
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

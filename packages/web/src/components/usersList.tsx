import { Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import type { FC } from 'react'
import type { EventUser } from '@prisma/client'
import NextLink from 'next/link'
import useCurrentProject from '~/hooks/useCurrentProject'

interface Props {
  users?: (EventUser & {
    _count: {
      issues: number
      metrics: number
      feedbacks: number
      pageViews: number
      userViews: number
    }
  })[]
}

function getUserView(user: EventUser) {
  const result = []
  if (user.email) {
    result.push(`Email[${user.email}]`)
  }
  if (user.ipAddress) {
    result.push(`IP[${user.ipAddress}]`)
  }
  if (user.name) {
    result.push(`Name[${user.name}]`)
  }
  if (user.uuid) {
    result.push(`UUID[${user.uuid}]`)
  }
  if (user.metadata) {
    result.push(`Metadata[${JSON.stringify(user.metadata)}]`)
  }
  return result.join(' / ')
}

const UsersList: FC<Props> = ({ users }) => {
  const { projectId } = useCurrentProject()

  return (
    <TableContainer>
      <Table className="w-full table table-compact">
        <Thead>
          <Tr>
            <Th>user</Th>
            <Th>issues</Th>
            <Th>metrics</Th>
            <Th>feedbacks</Th>
            <Th>pageViews</Th>
            <Th>userViews</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            users?.map((user) => {
              const desc = getUserView(user)
              return (
                <Tr key={user.id}>
                  <Td>
                    <NextLink
                      href={`/${projectId}/users/${user.id}`}
                      passHref
                    >
                      <Link>{desc}</Link>
                    </NextLink>
                  </Td>
                  <Td>{user._count.issues}</Td>
                  <Td>{user._count.metrics}</Td>
                  <Td>{user._count.feedbacks}</Td>
                  <Td>{user._count.pageViews}</Td>
                  <Td>{user._count.userViews}</Td>
                </Tr>
              )
            })
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default UsersList

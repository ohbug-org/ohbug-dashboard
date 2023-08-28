'use client'

import Link from 'next/link'
import { useCallback } from 'react'
import { type Key } from 'react'
import { type EventUser } from '@prisma/client'
import useCurrentProject from '~/hooks/use-current-project'
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '~/components/ui/table'

type User = EventUser & {
  _count: {
    issues: number
    metrics: number
    feedbacks: number
    pageViews: number
    userViews: number
  }
}
interface Props {
  users?: User[]
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

const columns = [
  {
    key: 'user',
    label: 'user',
  },
  {
    key: 'issues',
    label: 'issues',
  },
  {
    key: 'metrics',
    label: 'metrics',
  },
  {
    key: 'feedbacks',
    label: 'feedbacks',
  },
  {
    key: 'pageViews',
    label: 'pageViews',
  },
  {
    key: 'userViews',
    label: 'userViews',
  },
]

export default function UsersList({ users }: Props) {
  const { projectId } = useCurrentProject()

  const renderCell = useCallback((item: User, columnKey: Key) => {
    switch (columnKey) {
      case 'user':
        return (
          <Link href={`/${projectId}/users/${item.id}`}>
            {getUserView(item)}
          </Link>
        )
      case 'issues':
        return item._count.issues
      case 'metrics':
        return item._count.metrics
      case 'feedbacks':
        return item._count.feedbacks
      case 'pageViews':
        return item._count.pageViews
      case 'userViews':
        return item._count.userViews
      default:
        return null
    }
  }, [projectId])

  return (
    <Table className='rounded-md border'>
      <TableHeader>
        <TableRow>
          {columns.map(column => <TableHead key={column.key}>{column.label}</TableHead>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          users
            ? users.map(user => (
              <TableRow key={user.id}>
                {columns.map(column => <TableCell>{renderCell(user, column.key)}</TableCell>)}
              </TableRow>
            ))
            :[]
        }
      </TableBody>
    </Table>
  )
}

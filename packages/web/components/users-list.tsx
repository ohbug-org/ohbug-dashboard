'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { type EventUser } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import useCurrentProject from '~/hooks/use-current-project'
import DataTable from '~/components/data-table'

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

export default function UsersList({ users }: Props) {
  const { projectId } = useCurrentProject()

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: 'user',
        cell: ({ row }) => (
          <Link href={`/${projectId}/users/${row.getValue('id')}`}>
            {getUserView(row.original)}
          </Link>
        ),
      },
      {
        accessorKey: '_count',
        header: 'issues',
        cell: ({ row }) => (row.getValue('_count') as User['_count'])?.issues,
      },
      {
        header: 'metrics',
        cell: ({ row }) => (row.getValue('_count') as User['_count'])?.metrics,
      },
      {
        header: 'feedbacks',
        cell: ({ row }) => (row.getValue('_count') as User['_count'])?.feedbacks,
      },
      {
        header: 'pageViews',
        cell: ({ row }) => (row.getValue('_count') as User['_count'])?.pageViews,
      },
      {
        header: 'userViews',
        cell: ({ row }) => (row.getValue('_count') as User['_count'])?.userViews,
      },
    ],
    [projectId],
  )

  return (
    <DataTable
      columns={columns}
      data={users}
    />
  )
}

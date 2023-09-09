'use client'

import Link from 'next/link'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { type EventUser, type Feedback } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from '~/components/data-table'
import { renderStringOrJson } from '~/libs/utils'
import useCurrentProject from '~/hooks/use-current-project'

interface Props {
  feedbacks?: (Feedback & { user: EventUser })[]
}

export default function FeedbacksList({ feedbacks }: Props) {
  const { projectId } = useCurrentProject()

  const columns = useMemo<ColumnDef<Feedback & { user: EventUser }>[]>(
    () => [
      {
        accessorKey: 'detail',
        header: 'feedback',
        cell: ({ row }) => {
          return (
            <Link href={`/${projectId}/feedbacks/${row.original.id}`}>
              {(row.getValue('detail') as any)?.feedback}
            </Link>
          )
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'createdAt',
        cell: ({ row }) => dayjs(row.getValue('createdAt')).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        accessorKey: 'user',
        header: 'user',
        cell: ({ row }) => renderStringOrJson(row.getValue('user')),
      },
    ],
    [projectId],
  )

  return (
    <DataTable
      columns={columns}
      data={feedbacks}
    />
  )
}

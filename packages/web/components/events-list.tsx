'use client'

import Link from 'next/link'
import dayjs from 'dayjs'
import { type Event } from '@prisma/client'
import { type OhbugEventLike } from 'common'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { renderStringOrJson } from '~/libs/utils'
import useCurrentProject from '~/hooks/use-current-project'
import DataTable from '~/components/data-table'

interface Props {
  events?: Event[] | OhbugEventLike[]
}

export default function EventsList({ events }: Props) {
  const { projectId } = useCurrentProject()

  const columns = useMemo<ColumnDef<Event | OhbugEventLike>[]>(
    () => [
      {
        id: 'description',
        header: 'TITLE',
        cell: ({ row }) => {
          const detail = row.getValue('detail')
          return (
            <div>
              <Link href={`/${projectId}/issues/${row.getValue('issueId')}/?eventId=${row.getValue('id')}`}>
                {dayjs(row.getValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')}
              </Link>
              <div className="truncate max-w-xs">{row.getValue('type')}: {renderStringOrJson((detail as any)?.message ?? detail)}</div>
            </div>
          )
        },
      },
      {
        accessorKey: 'appType',
        header: 'APPTYPE',
      },
      {
        accessorKey: 'appVersion',
        header: 'APPVERSION',
      },
      {
        accessorKey: 'category',
        header: 'CATEGORY',
      },
      {
        accessorKey: 'releaseStage',
        header: 'RELEASESTAGE',
      },
      {
        accessorKey: 'user',
        header: 'USER',
        cell: ({ row }) => (
          <div className="line-clamp-2">{renderStringOrJson(row.getValue('user' || ''))}</div>
        ),
      },
      {
        accessorKey: 'sdk',
        header: 'SDK',
        cell: ({ row }) => (
          <div className="line-clamp-2">{renderStringOrJson(row.getValue('sdk'))}</div>
        ),
      },
      {
        accessorKey: 'device',
        header: 'DEVICE',
        cell: ({ row }) => (
          <div className="line-clamp-2">{renderStringOrJson(row.getValue('device'))}</div>
        ),
      },
      {
        accessorKey: 'metadata',
        header: 'METADATA',
        cell: ({ row }) => (
          <div className="line-clamp-2 max-w-xs">{renderStringOrJson(row.getValue('metadata'))}</div>
        ),
      },
    ],
    [projectId],
  )

  return (
    <DataTable
      columns={columns}
      data={events}
    />
  )
}

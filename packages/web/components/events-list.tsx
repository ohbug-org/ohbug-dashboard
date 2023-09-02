'use client'

import Link from 'next/link'
import dayjs from 'dayjs'
import { type FC, useCallback } from 'react'
import { type Event } from '@prisma/client'
import { type OhbugEventLike } from 'common'
import { renderStringOrJson } from '~/libs/utils'
import useCurrentProject from '~/hooks/use-current-project'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'

const columns = [
  { name: 'TITLE', key: 'description' },
  { name: 'TRENDS', key: 'appType' },
  { name: 'APPVERSION', key: 'appVersion' },
  { name: 'CATEGORY', key: 'category' },
  { name: 'RELEASESTAGE', key: 'releaseStage' },
  { name: 'USER', key: 'user' },
  { name: 'SDK', key: 'sdk' },
  { name: 'DEVICE', key: 'device' },
  { name: 'METADATA', key: 'metadata' },
]

interface Props {
  events?: Event[] | OhbugEventLike[]
}

const EventsList: FC<Props> = ({ events }) => {
  const { projectId } = useCurrentProject()

  const renderCell = useCallback((event: Event | OhbugEventLike, columnKey: string) => {
    switch (columnKey) {
      case 'description':
        return (
          <div>
            <Link href={`/${projectId}/issues/${event.issueId}/?eventId=${event.id}`}>
              {dayjs(event.createdAt).format('YYYY-MM-DD HH:mm:ss')}
            </Link>
            <div className="truncate max-w-xs">{event.type}: {renderStringOrJson((event.detail as any).message ?? event.detail)}</div>
          </div>
        )
      case 'appType':
        return (
          <div>{event.appType}</div>
        )
      case 'appVersion':
        return (
          <div>{event.appVersion}</div>
        )
      case 'category':
        return (
          <div>{event.category}</div>
        )
      case 'releaseStage':
        return (
          <div>{event.releaseStage}</div>
        )
      case 'users':
        return (
          <div className="line-clamp-2">{renderStringOrJson(('user' in event) ? event.user : '')}</div>
        )
      case 'sdk':
        return (
          <div className="line-clamp-2">{renderStringOrJson(event.sdk)}</div>
        )
      case 'device':
        return (
          <div className="line-clamp-2">{renderStringOrJson(event.device)}</div>
        )
      case 'metadata':
        return (
          <div className="line-clamp-2 max-w-xs">{renderStringOrJson(event.metadata)}</div>
        )
      default:
        return null
    }
  }, [])

  return (
    <Table className="rounded-lg border">
      <TableHeader>
        {
          columns.map(column => (
            <TableHead
              key={column.key}
              className="text-left"
            >
              {column.name}
            </TableHead>
          ))
        }
      </TableHeader>
      <TableBody>
        {
          events
            ? events.map(event => (
              <TableRow key={event.id}>
                {
                  Object.keys(event).map(columnKey => (
                    <TableCell>{renderCell(event, columnKey)}</TableCell>
                  ))
                }
              </TableRow>
            ))
            : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
              )
        }
      </TableBody>
    </Table>
  )
}

export default EventsList

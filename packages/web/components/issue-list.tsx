'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { type Issue } from 'common'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useDebounce } from 'react-use'
import { useAtom } from 'jotai'
import { type ReactNode } from 'react'
import { type ColumnDef, type PaginationState } from '@tanstack/react-table'
import { type SearchIssuesOrderBy } from '~/services/issues'
import {
  serviceDeleteIssues,
  serviceGetIssues,
  serviceGetIssuesTrends,
} from '~/services/issues'
import { renderStringOrJson } from '~/libs/utils'
import useCurrentProject from '~/hooks/use-current-project'
import { useQuery } from '~/hooks/use-query'
import { useInfinite } from '~/hooks/use-infinite'
import { issueSortAtom } from '~/atoms/issue'
import LineChart from '~/components/charts/line-chart'
import DataTable from '~/components/data-table'
import { useToast } from '~/components/ui/use-toast'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'
import { Switch } from '~/components/ui/switch'
import { Label } from '~/components/ui/label'
import { Badge } from '~/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { Input } from '~/components/ui/input'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Checkbox } from '~/components/ui/checkbox'

interface Props {
  empty: ReactNode
}

export default function IssueList({ empty }: Props) {
  const { toast } = useToast()
  const t = useTranslations('Issues')
  const ct = useTranslations('Common')
  const { projectId } = useCurrentProject()
  const [open, setOpen] = useState(false)
  const cancelRef = useRef(null)
  const [orderBy, setOrderBy] = useAtom(issueSortAtom)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  useDebounce(
    () => {
      setDebouncedQuery(query)
    },
    500,
    [query],
  )
  const { data, setSize, mutate }
    = useInfinite<Issue>(
      index =>
        serviceGetIssues({
          page: index + 1,
          projectId: projectId!,
          orderBy,
          query: debouncedQuery,
        }),
      {
        enabled: projectId !== undefined,
        deps: [projectId, orderBy, debouncedQuery],
        pagination: true,
      },
    )
  const [chartType, setChartType] = useState<'24h' | '14d'>('24h')
  const { data: trends } = useQuery(
    () =>
      serviceGetIssuesTrends({
        ids: data!.map(issue => issue.id).join(','),
        type: chartType,
      }),
    {
      enabled: !!data,
      deps: [data, chartType],
    },
  )

  const columns = useMemo<ColumnDef<Issue>[]>(
    () => ([
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            aria-label="Select all"
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            onCheckedChange={value => row.toggleSelected(!!value)}
          />
        ),
      },
      {
        id: 'title',
        header: ({ table }) => {
          const handleDeleteIssue = () => {
            const checkedIssues = table.getFilteredSelectedRowModel().rows
            serviceDeleteIssues(checkedIssues.map(v => v.id))
              .then(() => {
                toast({
                  title: 'Issue Deleted!',
                  description: 'Your issues has been deleted!',
                })
                mutate()
              })
              .catch((error) => {
                toast({
                  title: 'Alert Delete Error',
                  description: error.message,
                  variant: 'destructive',
                })
              })
              .finally(() => setOpen(false))
          }

          return (
            <div className="flex gap-2">
              <Select
                value={orderBy}
                onValueChange={e => setOrderBy(e as SearchIssuesOrderBy)}
              >
                <SelectTrigger className="w-60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="updatedAt">{t('orderByUpdatedAt')}</SelectItem>
                  <SelectItem value="createdAt">{t('orderByCreatedAt')}</SelectItem>
                  <SelectItem value="events">{t('orderByEvents')}</SelectItem>
                  <SelectItem value="users">{t('orderByUsers')}</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    disabled={table.getFilteredSelectedRowModel().rows.length <= 0}
                    size="icon"
                    variant="outline"
                  >
                    <i className="i-ri-more-line" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem
                    key="delete"
                    onClick={() => setOpen(true)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog
                open={open}
                onOpenChange={setOpen}
              >
                <DialogContent>
                  <DialogHeader className="text-lg font-bold">
                    <DialogTitle>
                      Are you sure you want to delete this {table.getFilteredSelectedRowModel().rows.length} issue?
                    </DialogTitle>
                  </DialogHeader>
                  <div>{t('deleteIssuesConfirm')}</div>
                  <DialogFooter>
                    <Button
                      ref={cancelRef}
                      variant="outline"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="ml-3"
                      variant="destructive"
                      onClick={handleDeleteIssue}
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )
        },
        cell: ({ row }) => {
          const metadata = JSON.parse(row.original.metadata) || {}
          return (
            <div>
              <Link
                className="cursor-pointer flex items-center w-full line-clamp-2"
                href={`/${projectId}/issues/${row.original.id}`}
              >
                {/* title */}
                <span className="font-semibold mr-2">{row.original.type}</span>
                {
                  row.original.releaseStage === 'mock' && (
                    <Badge
                      className="mr-2"
                      variant="outline"
                    >
                      Mock
                    </Badge>
                  )
              }
                {/* second description */}
                <code className="text-stone-500">
                  {renderStringOrJson(metadata.filename ?? metadata.others)}
                </code>
              </Link>
              {/* message */}
              <div className="text-stone-500 line-clamp-2">
                {
                metadata.message ? <code>{renderStringOrJson(metadata.message)}</code> : null
              }
              </div>
              {/* other message (time/appType/...) */}
              <div>
                {/* appType */}
                {/* time */}
                <div className="flex items-center text-xs">
                  <i className="i-ri-time-line mr-2" />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>{dayjs(row.original.updatedAt).fromNow()}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>{ct('lastSeen')} {dayjs(row.original.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </TooltipContent>
                  </Tooltip>

                  <div className="mx-1">|</div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>{dayjs(row.original.createdAt).fromNow()}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>{ct('firstSeen')} {dayjs(row.original.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          )
        },
      },
      {
        id: 'trends',
        header: () => (
          <div className="flex items-center gap-2">
            <Switch
              checked={chartType === '24h'}
              disabled={!trends || !data?.length}
              id="trendsType"
              onCheckedChange={e => setChartType(e ? '24h' : '14d')}
            />
            <Label htmlFor="trendsType">{chartType === '24h' ? ct('24h') : ct('14d')}</Label>
          </div>
        ),
        cell: ({ row }) => (
          <div className="h-16">
            <LineChart
              data={trends?.[row.original.id]}
              nameKey="time"
              tooltipType={chartType === '14d' ? 'a' : 'b'}
              valueKey="count"
            />
          </div>
        ),
      },
      {
        id: 'eventsCount',
        header: 'Events',
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            {row.original._count?.events}
          </div>
        ),
      },
      {
        id: 'usersCount',
        header: 'Users',
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            {row.original._count?.users}
          </div>
        ),
      },
    ]),
    [orderBy, chartType, data, trends, open],
  )

  const handlePaginationChange = useCallback(({ pageIndex }: PaginationState) => {
    setSize(pageIndex)
  }, [])

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto space-y-4">
      <Input
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <DataTable
        columns={columns}
        data={data}
        empty={empty}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  )
}

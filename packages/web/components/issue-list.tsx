'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { type Issue } from 'common'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useDebounce, useSet } from 'react-use'
import { useAtom } from 'jotai'
import { type ReactNode } from 'react'
import Pagination from './pagination'
import Spinning from './spinning'
import LineChart from './charts/line-chart'
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
import { useToast } from '~/components/ui/use-toast'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'
import { Switch } from '~/components/ui/switch'
import { Label } from '~/components/ui/label'
import { Badge } from '~/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { Input } from '~/components/ui/input'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Checkbox } from '~/components/ui/checkbox'

const columns = [
  { name: 'SELECT', key: 'select' },
  { name: 'TITLE', key: 'title' },
  { name: 'TRENDS', key: 'trends' },
  { name: 'EVENTSCOUNT', key: 'eventsCount' },
  { name: 'USERSCOUNT', key: 'usersCount' },
]

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
  const { data, size, setSize, isLoading, isReachingEnd, mutate }
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

  // handle selected data
  const [checkedItems, checkedItemsActions] = useSet(new Set<string>())
  const allChecked = useMemo(
    () =>
      checkedItems?.size > 0
      && checkedItems?.size === data?.length
      && Array.from(checkedItems ?? []).every(v => (data?.findIndex(issue => issue.id === v) ?? -1) > -1),
    [checkedItems, data],
  )
  const handleDeleteIssue = useCallback(() => {
    const issueIds = Array.from(checkedItems)
    serviceDeleteIssues(issueIds)
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
  }, [checkedItems])

  const renderTitleCell = useCallback((columnKey: string) => {
    switch (columnKey) {
      case 'select':
        return (
          <Checkbox
            checked={allChecked}
            className="translate-y-[2px]"
            onCheckedChange={(value) => {
              if (value) {
                data?.forEach(issue => checkedItemsActions.add(issue.id))
              }
              else {
                checkedItemsActions.reset()
              }
            }}
          />
        )
      case 'title':
        return (
          <div>
            <div className="flex gap-2">
              <Select
                value={orderBy}
                onValueChange={
                  e => setOrderBy(e as SearchIssuesOrderBy)
                }
              >
                <SelectTrigger className="w-40">
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
                    disabled={checkedItems.size <= 0}
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
            </div>
          </div>
        )
      case 'trends':
        return (
          <div className="flex items-center gap-2">
            <Switch
              checked={chartType === '24h'}
              disabled={!trends || !data?.length}
              id="trendsType"
              onCheckedChange={e => setChartType(e ? '24h' : '14d')}
            />
            <Label htmlFor="trendsType">{chartType === '24h' ? ct('24h') : ct('14d')}</Label>
          </div>
        )
      case 'eventsCount':
        return (
          <div className="flex items-center justify-center">Events</div>
        )
      case 'usersCount':
        return (
          <div className="flex items-center justify-center">Users</div>
        )
      default:
        return null
    }
  }, [data, allChecked, checkedItems, trends, data, chartType])
  const renderCell = useCallback((issue: Issue, columnKey: string) => {
    const metadata = JSON.parse(issue.metadata) || {}

    switch (columnKey) {
      case 'select':
        return (
          <Checkbox
            checked={checkedItems.has(issue.id)}
            className="translate-y-[2px]"
            onCheckedChange={value => checkedItemsActions[value ? 'add' : 'remove'](issue.id)}
          />
        )
      case 'title':
        return (
          <div>
            <Link
              className="cursor-pointer flex items-center w-full line-clamp-2"
              href={`/${projectId}/issues/${issue.id}`}
            >
              {/* title */}
              <span className="font-semibold mr-2">{issue.type}</span>
              {
                issue.releaseStage === 'mock' && (
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
                    <span>{dayjs(issue.updatedAt).fromNow()}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{ct('lastSeen')} {dayjs(issue.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                  </TooltipContent>
                </Tooltip>

                <div className="mx-1">|</div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>{dayjs(issue.createdAt).fromNow()}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{ct('firstSeen')} {dayjs(issue.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        )
      case 'trends':
        return (
          <div className="h-16">
            <LineChart
              data={trends?.[issue.id]}
              nameKey="time"
              tooltipType={chartType === '14d' ? 'a' : 'b'}
              valueKey="count"
            />
          </div>
        )
      case 'eventsCount':
        return (
          <div className="flex items-center justify-center">
            {issue._count?.events}
          </div>
        )
      case 'usersCount':
        return (
          <div className="flex items-center justify-center">
            {issue._count?.users}
          </div>
        )
      default:
        return null
    }
  }, [checkedItems, projectId, trends, chartType])

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto space-y-4">
      <Input
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <Table className="rounded-md border">
        <TableCaption>
          {
            !!data?.length && (
              <div className="flex items-center justify-between w-full">
                <Link href={`/${projectId}/mock`}>Mock Data</Link>
                <Pagination
                  isReachingEnd={!!isReachingEnd}
                  page={size + 1}
                  onChange={page => setSize(page - 1)}
                />
              </div>
            )
          }
        </TableCaption>
        <TableHeader>
          <TableRow>
            {
              columns.map(column => (
                <TableHead
                  key={column.key}
                  className="text-left"
                >
                  {renderTitleCell(column.key)}
                </TableHead>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data
              ? data.map(issue => (
                <TableRow key={issue.id}>
                  {
                    columns.map(column => (
                      <TableCell>{renderCell(issue, column.key)}</TableCell>
                    ))
                  }
                </TableRow>
              ))
              : (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    {isLoading ? <Spinning /> : empty}
                  </TableCell>
                </TableRow>
                )
          }
        </TableBody>
      </Table>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent>
          <DialogHeader className="text-lg font-bold">
            <DialogTitle>
              Are you sure you want to delete this {checkedItems.size} issue?
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
}

'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { type Issue } from 'common'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useDebounce, useSet } from 'react-use'
import { useAtom } from 'jotai'
import {
  Badge,
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import { useToast } from '@chakra-ui/react'
import { type Key, type ReactNode } from 'react'
import TrendChart from './trend-chart'
import Pagination from './pagination'
import Spinning from './spinning'
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

const columns = [
  { name: 'TITLE', key: 'title' },
  { name: 'TRENDS', key: 'trends' },
  { name: 'EVENTSCOUNT', key: 'eventsCount' },
  { name: 'USERSCOUNT', key: 'usersCount' },
]

interface Props {
  empty: ReactNode;
}

export default function IssueList({ empty }: Props) {
  const toast = useToast()
  const t = useTranslations('Issues')
  const ct = useTranslations('Common')
  const { projectId } = useCurrentProject()
  const { isOpen, onClose, onOpen } = useDisclosure()
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
  const isIndeterminate = useMemo(
    () =>
      Array.from(checkedItems ?? []).some(v => (data?.findIndex(issue => issue.id === v) ?? -1) > -1) && !allChecked,
    [checkedItems, data, allChecked],
  )
  const handleDeleteIssue = useCallback(() => {
    const issueIds = Array.from(checkedItems)
    serviceDeleteIssues(issueIds)
      .then(() => {
        toast({
          title: 'Issue Deleted!',
          description: 'Your issues has been deleted!',
          status: 'success',
        })
        mutate()
      })
      .catch((error) => {
        toast({
          title: 'Alert Delete Error',
          description: error.message,
          status: 'error',
        })
      })
      .finally(onClose)
  }, [checkedItems])

  const renderTitleCell = useCallback((columnKey: Key) => {
    switch (columnKey) {
      case 'title':
        return (
          <div className="w-1/2">
            <div className="flex gap-2">
              <select
                className="w-40"
                onChange={
                  e =>
                    setOrderBy(e.target.value as SearchIssuesOrderBy)
                }
                value={orderBy}
              >
                <option value="updatedAt">{t('orderByUpdatedAt')}</option>
                <option value="createdAt">{t('orderByCreatedAt')}</option>
                <option value="events">{t('orderByEvents')}</option>
                <option value="users">{t('orderByUsers')}</option>
              </select>

              <Dropdown>
                <DropdownTrigger>
                  <Button
                    disabled={checkedItems.size <= 0}
                    isIconOnly
                    size="sm"
                    variant="light"
                  >
                    <i className="i-ri-more-line" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    color="danger"
                    key="delete"
                    onClick={onOpen}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        )
      case 'trends':
        return (
          <div className="w-48">
            <Switch
              id="trendsType"
              isDisabled={!trends || !data?.length}
              isSelected={chartType === '24h'}
              onChange={e => setChartType(e ? '24h' : '14d')}
            >
              {chartType === '24h' ? ct('24h') : ct('14d')}
            </Switch>
          </div>
        )
      case 'eventsCount':
        return (
          <div className="w-20 flex items-center justify-center">Events</div>
        )
      case 'usersCount':
        return (
          <div className="w-20 flex items-center justify-center">Users</div>
        )
      default:
        return null
    }
  }, [])
  const renderCell = useCallback((issue: Issue, columnKey: Key) => {
    const metadata = JSON.parse(issue.metadata) || {}

    switch (columnKey) {
      case 'title':
        return (
          <div className="w-1/2">
            <Link
              className="cursor-pointer flex justify-between w-full line-clamp-2"
              href={`/${projectId}/issues/${issue.id}`}
            >
              {/* title */}
              <span className="font-semibold mr-2">{issue.type}</span>
              {
                issue.releaseStage === 'mock' && (
                  <Badge
                    className="mr-2"
                    color="danger"
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
                metadata.message && (
                  <code>{renderStringOrJson(metadata.message)}</code>
                )
              }
            </div>
            {/* other message (time/appType/...) */}
            <div>
              {/* appType */}
              {/* time */}
              <div className="flex items-center text-xs">
                <i className="i-ri-time-line mr-2" />
                <Tooltip
                  aria-label="A tooltip"
                  content={
                    `${ct('lastSeen')} ${dayjs(issue.updatedAt).format('YYYY-MM-DD HH:mm:ss')}`
                  }
                >
                  <span>{dayjs(issue.updatedAt).fromNow()}</span>
                </Tooltip>

                <div className="mx-1">|</div>

                <Tooltip
                  aria-label="A tooltip"
                  content={
                    `${ct('firstSeen')} ${dayjs(issue.createdAt).format('YYYY-MM-DD HH:mm:ss')}`
                  }
                >
                  <span>{dayjs(issue.createdAt).fromNow()}</span>
                </Tooltip>
              </div>
            </div>
          </div>
        )
      case 'trends':
        return (
          <div className="w-48">
            <TrendChart
              data={trends?.[issue.id]}
              type={chartType}
            />
          </div>
        )
      case 'eventsCount':
        return (
          <div className="flex items-center justify-center w-20">
            {issue._count?.events}
          </div>
        )
      case 'usersCount':
        return (
          <div className="flex items-center justify-center w-20">
            {issue._count?.users}
          </div>
        )
      default:
        return null
    }
  }, [])

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto w-full">
      <div className="mb-4 w-full">
        <Input
          onChange={e => setQuery(e.target.value)}
          placeholder="Search..."
          startContent={
            isLoading ? <Spinning /> : <i className="i-ri-search-line" />
          }
          value={query}
        />
      </div>

      <Table aria-label="Issues Table">
        <TableHeader columns={columns}>
          {
            column => (
              <TableColumn
                align="start"
                key={column.key}
              >
                {renderTitleCell(column.key)}
              </TableColumn>
            )
          }
        </TableHeader>
        <TableBody
          emptyContent="No rows to display."
          items={data}
        >
          {
            data
              ? item => (
                <TableRow key={item.id}>
                  {
                    columnKey => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )
                  }
                </TableRow>
              )
              : []
          }
        </TableBody>
      </Table>

      {
        !!data?.length && (
          <div className="flex items-center justify-between mt-6 w-full">
            <Link href={`/${projectId}/mock`}>Mock Data</Link>
            <Pagination
              isReachingEnd={!!isReachingEnd}
              onChange={page => setSize(page - 1)}
              page={size + 1}
            />
          </div>
        )
      }

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <>
          <ModalHeader className="text-lg font-bold">
            Are you sure you want to delete this {checkedItems.size} issue?
          </ModalHeader>
          <ModalContent>
            <ModalBody>{t('deleteIssuesConfirm')}</ModalBody>
          </ModalContent>
          <ModalFooter>
            <Button
              onClick={onClose}
              ref={cancelRef}
              variant="light"
            >
              Cancel
            </Button>
            <Button
              className="ml-3"
              color="danger"
              onClick={handleDeleteIssue}
            >
              Delete
            </Button>
          </ModalFooter>
        </>
      </Modal>
    </div>
  )
}

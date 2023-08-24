'use client'

import { useCallback } from 'react'
import dayjs from 'dayjs'
import { Badge, Tag, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import type { Alert } from '@prisma/client'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip } from '@nextui-org/react'
import useCurrentProject from '~/hooks/use-current-project'
import { serviceDeleteAlert } from '~/services/alerts'

interface Props {
  alerts: Alert[]
  mutate: any
}

export default function AlertList({ alerts, mutate }: Props) {
  const { projectId } = useCurrentProject()
  const toast = useToast()
  const onDelete = useCallback((id: number) => {
    serviceDeleteAlert({ id })
      .then(() => {
        toast({
          title: 'Alert Deleted!',
          description: 'Your alert has been deleted!',
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
  }, [])

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto rounded-lg w-full">
      {
        alerts.map((alert) => {
          let colorScheme = 'gray'
          if (alert.level === 'serious') colorScheme = 'red'
          if (alert.level === 'warning') colorScheme = 'yellow'
          return (
            <div
              className="mb-2"
              key={alert.id}
            >
              <div className="flex items-center gap-2">
                <Link
                  className="text-lg font-semibold"
                  href={`/${projectId}/alerts/${alert.id}`}
                >
                  {alert.name}
                </Link>
                <Badge colorScheme={colorScheme}>{alert.level}</Badge>
              </div>

              <div className="flex items-center justify-end flex-1 gap-2">
                <div className="flex gap-2">
                  {
                    (alert.actions as Array<any>)?.map(action => (
                      <Tag key={action.uri}>{action.type}</Tag>
                    ))
                  }
                </div>
                <Tooltip content={`Updated at: ${dayjs(alert.createdAt).format('YYYY-MM-DD HH:mm:ss')}`}>
                  <div className="text-stone-500">{dayjs(alert.createdAt).fromNow()}</div>
                </Tooltip>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                    >
                      <i className="i-ri-more-line" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link href={`/${projectId}/alerts/${alert.id}/edit`}>
                        Edit
                      </Link>
                    </DropdownItem>
                    <DropdownItem
                      color="danger"
                      onPress={
                        () => {
                          onDelete(alert.id)
                        }
                      }
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

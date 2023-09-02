'use client'

import { useCallback } from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { type Alert } from '@prisma/client'
import useCurrentProject from '~/hooks/use-current-project'
import { serviceDeleteAlert } from '~/services/alerts'
import { useToast } from '~/components/ui/use-toast'
import { Badge } from '~/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'

interface Props {
  alerts: Alert[]
  mutate: any
}

export default function AlertList({ alerts, mutate }: Props) {
  const { projectId } = useCurrentProject()
  const { toast } = useToast()
  const onDelete = useCallback((id: number) => {
    serviceDeleteAlert({ id })
      .then(() => {
        toast({
          title: 'Alert Deleted!',
          description: 'Your alert has been deleted!',
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
  }, [])

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto rounded-lg w-full">
      {
        alerts.map((alert) => {
          let variant = 'secondary'
          if (alert.level === 'serious') variant = 'destructive'
          if (alert.level === 'warning') variant = 'default'
          return (
            <div
              key={alert.id}
              className="mb-2"
            >
              <div className="flex items-center gap-2">
                <Link
                  className="text-lg font-semibold"
                  href={`/${projectId}/alerts/${alert.id}`}
                >
                  {alert.name}
                </Link>
                <Badge variant={variant as any}>{alert.level}</Badge>
              </div>

              <div className="flex items-center justify-end flex-1 gap-2">
                <div className="flex gap-2">
                  {
                    (alert.actions as Array<any>)?.map(action => (
                      <Badge
                        key={action.uri}
                        variant="outline"
                      >{action.type}
                      </Badge>
                    ))
                  }
                </div>
                <Tooltip>

                  <TooltipTrigger asChild>
                    <div className="text-stone-500">{dayjs(alert.createdAt).fromNow()}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Updated at: {dayjs(alert.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      size="icon"
                      variant="outline"
                    >
                      <i className="i-ri-more-line" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link href={`/${projectId}/alerts/${alert.id}/edit`}>
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          onDelete(alert.id)
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

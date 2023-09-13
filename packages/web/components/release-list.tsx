'use client'

import { useCallback } from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { type Release } from '@prisma/client'
import useCurrentProject from '~/hooks/use-current-project'
import { serviceDeleteRelease } from '~/services/releases'
import { useToast } from '~/components/ui/use-toast'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'

interface Props {
  releases: Release[]
  mutate: () => Promise<void>
}
export default function ReleaseList({ releases, mutate }: Props) {
  const { toast } = useToast()
  const { projectId } = useCurrentProject()

  const onDelete = useCallback((id: number) => {
    serviceDeleteRelease({ id })
      .then(() => {
        toast({
          title: 'Release Deleted!',
          description: 'Your release has been deleted!',
        })
        mutate()
      })
      .catch((error) => {
        toast({
          title: 'Release Delete Error',
          description: error.message,
          variant: 'destructive',
        })
      })
  }, [mutate])

  return (
    <div className="h-full w-full overflow-x-hidden overflow-y-auto rounded-lg">
      {
        releases.map(release => (
          <div key={release.id}>
            <div className="flex flex-col flex-1">
              <span className="font-semibold">{release.appVersion}</span>
              <span>
                {release.appType}
              </span>
            </div>
            <div className="flex flex-col flex-1">
              <span className="font-semibold">sourceMap files</span>
              <Link
                className="font-semibold"
                href={`/${projectId}/releases/${release.id}/sourceMaps`}
              >
                {(release.sourceMaps as Array<any>)?.length}
              </Link>
            </div>
            <div className="flex items-center justify-end gap-2 flex-1">
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-stone-500">
                    {dayjs(release.createdAt).fromNow()}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <span>{dayjs(release.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                </TooltipContent>
              </Tooltip>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                  >
                    <i className="i-ri-more-line" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => {
                        onDelete(release.id)
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))
      }
    </div>
  )
}

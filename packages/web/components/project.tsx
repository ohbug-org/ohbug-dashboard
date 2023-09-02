'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { type User } from '@prisma/client'
import { usePathname, useRouter } from 'next-intl/client'
import { useSession } from 'next-auth/react'
import { type FC } from 'react'
import Loading from './loading'
import { useStore } from '~/store'
import { serviceGetProjectsWithEventCount } from '~/services/projects'
import { useQuery } from '~/hooks/use-query'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '~/components/ui/command'
import { cn } from '~/libs/utils'

const ProjectComponent: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const session = useSession()
  const { data: projects } = useQuery(
    () => serviceGetProjectsWithEventCount(session.data?.user as User),
    { enabled: session.status === 'authenticated' },
  )
  const currentProject = useStore(state => state.project)
  const setCurrentProject = useStore(state => state.setProject)
  const loading = useMemo(() => !projects, [projects])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const target = projects?.find(project => project.default) ?? projects?.[0]
    if (target) setCurrentProject(target)
  }, [projects])

  const handleSelectProject = useCallback((value: string | string[]) => {
    const project = projects?.find(v => v.id.toString() === value)
    if (project) {
      setCurrentProject(project)
      router.replace(`${pathname}?projectId=${project.id}`)
    }
  }, [projects, pathname])
  const handleCreateProject = useCallback(() => {
    router.push('/create-project')
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          aria-label="Select a team"
          className="w-[200px] justify-between"
          role="combobox"
          variant="outline"
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage
              alt={currentProject?.name}
              src={currentProject?.image ?? ''}
            />
            <AvatarFallback>{currentProject?.name}</AvatarFallback>
          </Avatar>
          {currentProject?.name}
          <i className="i-ri-expand-up-down-line ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search team..." />
            <CommandEmpty>No team found.</CommandEmpty>
            <CommandGroup>
              {projects?.map(project => (
                <CommandItem
                  key={project.id}
                  className="text-sm"
                  onSelect={() => {
                    setOpen(false)
                    handleSelectProject(project.id.toString())
                  }}
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      alt={project.name}
                      src={project.image ?? ''}
                    />
                    <AvatarFallback>{project.name}</AvatarFallback>
                  </Avatar>
                  {project.name}
                  <i className={cn(
                    '\'i-ri-check-line\' ml-auto h-4 w-4',
                    project.id.toString() === currentProject?.id.toString()
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem onClick={handleCreateProject}>
                <i className="i-ri-add-line mr-2" />
                Create Project
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ProjectComponent

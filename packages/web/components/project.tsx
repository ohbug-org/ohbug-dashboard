'use client'

import type { FC } from 'react'
import { useCallback, useEffect, useMemo } from 'react'
import { Avatar, Center, Icon, IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuItemOption, MenuList, MenuOptionGroup, Text } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import type { User } from '@prisma/client'
import { RiAddLine, RiMore2Line } from 'react-icons/ri'
import { usePathname, useRouter } from 'next-intl/client'
import { useSession } from 'next-auth/react'
import Loading from './loading'
import { useStore } from '~/store'
import { serviceGetProjectsWithEventCount } from '~/services/projects'
import { useQuery } from '~/hooks/useQuery'

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
    <Center gap="2">
      <Avatar
        name={currentProject?.name}
        size="xs"
        src={currentProject?.image ?? ''}
      />
      <Link href={`/${currentProject?.id}/profile`}>
        {currentProject?.name}
      </Link>
      <Menu>
        <MenuButton
          aria-label="more"
          as={IconButton}
          icon={<RiMore2Line />}
          variant="ghost"
        />

        <MenuList>
          <MenuOptionGroup
            onChange={handleSelectProject}
            value={currentProject?.id.toString()}
          >
            {
              projects?.map(project => (
                <MenuItemOption
                  key={project.id}
                  value={project.id.toString()}
                >
                  <Text>{project.name}</Text>
                </MenuItemOption>
              ))
            }
          </MenuOptionGroup>

          <MenuDivider />

          <MenuGroup>
            <MenuItem
              icon={
                (
                  <Icon
                    as={RiAddLine}
                    h="6"
                    w="6"
                  />
                )
              }
              onClick={handleCreateProject}
            >
              Create Project
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Center>
  )
}

export default ProjectComponent

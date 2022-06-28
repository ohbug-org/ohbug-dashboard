import type { FC } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Avatar, Center, Icon, IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuItemOption, MenuList, MenuOptionGroup, Text } from '@chakra-ui/react'
import useSWR from 'swr'
import type { Project } from '@prisma/client'
import { RiAddLine, RiMore2Line } from 'react-icons/ri'
import { useRouter } from 'next/router'
import Loading from './loading'

const ProjectComponent: FC = () => {
  const router = useRouter()
  const { data: projects } = useSWR<Project[]>('/api/projects')
  const [currentProject, setCurrentProject] = useState(() => projects?.find(project => project.default))
  const loading = useMemo(() => !projects, [projects])

  useEffect(() => {
    const target = projects?.find(project => project.default)
    if (target) setCurrentProject(target)
  }, [projects])

  const handleSelectProject = useCallback((value: string | string[]) => {
    const project = projects?.find(v => v.id.toString() === value)
    if (project) setCurrentProject(project)
  }, [projects])
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
      <Text>{currentProject?.name}</Text>
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

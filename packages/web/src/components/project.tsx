import type { FC } from 'react'
import { useCallback, useEffect, useMemo } from 'react'
import { Avatar, Center, Icon, IconButton, Link, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuItemOption, MenuList, MenuOptionGroup, Text } from '@chakra-ui/react'
import type { User } from '@prisma/client'
import { RiAddLine, RiMore2Line } from 'react-icons/ri'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { useSession } from 'next-auth/react'
import Loading from './loading'
import { useStore } from '~/store'
import { serviceGetProjectsWithEventCount } from '~/services/projects'
import { useQuery } from '~/hooks/useQuery'

const ProjectComponent: FC = () => {
  const router = useRouter()
  const session = useSession()
  const { data: projects } = useQuery(
    () => serviceGetProjectsWithEventCount(session.data?.user as User),
    { enabled: session.status === 'authenticated' },
  )
  const currentProject = useStore(state => state.project)
  const setCurrentProject = useStore(state => state.setProject)
  const loading = useMemo(() => !projects, [projects])

  useEffect(() => {
    const target = projects?.find(project => project.default)
    if (target) setCurrentProject(target)
  }, [projects])

  const handleSelectProject = useCallback((value: string | string[]) => {
    const project = projects?.find(v => v.id.toString() === value)
    if (project) {
      setCurrentProject(project)
      router.replace({
        pathname: router.route,
        query: { projectId: project.id },
      })
    }
  }, [projects, router])
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
      <NextLink href={`/${currentProject?.id}/profile`}>
        <Link>{currentProject?.name}</Link>
      </NextLink>
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

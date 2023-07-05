'use client'

import type { FC } from 'react'
import { useCallback } from 'react'
import dayjs from 'dayjs'
import { Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip, useToast } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import type { Release } from '@prisma/client'
import { RiMoreLine } from 'react-icons/ri'
import useCurrentProject from '~/hooks/useCurrentProject'
import { serviceDeleteRelease } from '~/services/releases'

interface Props {
  releases: Release[]
  mutate: () => Promise<void>
}
const ReleaseList: FC<Props> = ({ releases, mutate }) => {
  const toast = useToast()
  const { projectId } = useCurrentProject()

  const onDelete = useCallback((id: number) => {
    serviceDeleteRelease({ id })
      .then(() => {
        toast({
          title: 'Release Deleted!',
          description: 'Your release has been deleted!',
          status: 'success',
        })
        mutate()
      })
      .catch((error) => {
        toast({
          title: 'Release Delete Error',
          description: error.message,
          status: 'error',
        })
      })
  }, [mutate])

  return (
    <Box
      h="full"
      overflowX="hidden"
      overflowY="auto"
      rounded="lg"
      w="full"
    >
      {
        releases.map(release => (
          <Flex key={release.id}>
            <Flex
              direction="column"
              flex="1"
            >
              <Link fontWeight="semibold">{release.appVersion}</Link>
              <Text
                as="span"
                color="dimgray"
              >
                {release.appType}
              </Text>
            </Flex>
            <Flex
              direction="column"
              flex="1"
            >
              <Text
                as="span"
                fontWeight="semibold"
              >
                sourceMap files
              </Text>
              <Link
                fontWeight="semibold"
                href={`/${projectId}/releases/${release.id}/sourceMaps`}
              >
                {(release.sourceMaps as Array<any>)?.length}
              </Link>
            </Flex>
            <Flex
              align="center"
              flex="1"
              gap="2"
              justify="end"
            >
              <Tooltip label={dayjs(release.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                <Text
                  as="span"
                  color="gray"
                >
                  {dayjs(release.createdAt).fromNow()}
                </Text>
              </Tooltip>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<RiMoreLine />}
                  size="sm"
                  variant="ghost"
                />
                <MenuList>
                  <MenuItem
                    onClick={
                      () => {
                        onDelete(release.id)
                      }
                    }
                    textColor="red"
                  >
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        ))
      }
    </Box>
  )
}

export default ReleaseList

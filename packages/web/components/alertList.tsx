'use client'

import type { FC } from 'react'
import { useCallback } from 'react'
import dayjs from 'dayjs'
import { Badge, Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Tag, Text, Tooltip, useToast } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import type { Alert } from '@prisma/client'
import { RiMoreLine } from 'react-icons/ri'
import useCurrentProject from '~/hooks/useCurrentProject'
import { serviceDeleteAlert } from '~/services/alerts'

interface Props {
  alerts: Alert[]
  mutate: any
}
const AlertList: FC<Props> = ({ alerts, mutate }) => {
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
    <Box
      h="full"
      overflowX="hidden"
      overflowY="auto"
      rounded="lg"
      w="full"
    >
      {
        alerts.map((alert) => {
          let colorScheme = 'gray'
          if (alert.level === 'serious') colorScheme = 'red'
          if (alert.level === 'warning') colorScheme = 'yellow'
          return (
            <Flex
              key={alert.id}
              mb="2"
            >
              <Flex
                align="center"
                gap="2"
              >
                <Link
                  fontSize="lg"
                  fontWeight="semibold"
                  href={`/${projectId}/alerts/${alert.id}`}
                >
                  {alert.name}
                </Link>
                <Badge colorScheme={colorScheme}>{alert.level}</Badge>
              </Flex>

              <Flex
                align="center"
                flex="1"
                gap="2"
                justify="end"
              >
                <Flex gap="2">
                  {
                    (alert.actions as Array<any>)?.map(action => (
                      <Tag key={action.uri}>{action.type}</Tag>
                    ))
                  }
                </Flex>
                <Tooltip label={`Updated at: ${dayjs(alert.createdAt).format('YYYY-MM-DD HH:mm:ss')}`}>
                  <Text color="gray">{dayjs(alert.createdAt).fromNow()}</Text>
                </Tooltip>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<RiMoreLine />}
                    size="sm"
                    variant="ghost"
                  />
                  <MenuList>
                    <Link href={`/${projectId}/alerts/${alert.id}/edit`}>
                      <MenuItem>
                        Edit
                      </MenuItem>
                    </Link>
                    <MenuItem
                      onClick={
                        () => {
                          onDelete(alert.id)
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
          )
        })
      }
    </Box>
  )
}

export default AlertList

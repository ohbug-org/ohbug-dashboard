import { Box, Flex, Tag, TagLabel, TagLeftIcon, Tooltip, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import type { FC } from 'react'
import { useMemo } from 'react'
import type { OhbugEventLike } from 'common'
import type { OhbugAction } from '@ohbug/types'
import ThemeBox from './themeBox'
import Wrapper from './wrapper'
import CardSection from './cardSection'
import { getMessageAndIconByActionType } from '~/libs/utils'

interface Props {
  event: OhbugEventLike
}

const EventDetailActions: FC<Props> = ({ event }) => {
  const actions = useMemo<OhbugAction[]>(() => [
    ...event?.actions ?? [], {
      type: 'exception',
      timestamp: event.createdAt as unknown as string,
      message: event.detail.message,
      data: event.detail,
    },
  ], [event])
  return (
    <ThemeBox bg="gray">
      <Wrapper>
        <CardSection title="Event Actions">
          <VStack
            maxH="xl"
            overflowY="auto"
            spacing="4"
          >
            {
              actions.map((action, index) => {
                const { message, icon, color } = getMessageAndIconByActionType(action)
                return (
                  <Flex
                    align="center"
                    gap="2"
                    justify="space-between"
                    key={action.timestamp + action.data}
                    w="full"
                  >
                    <Box
                      position="relative"
                      w="36"
                    >
                      <Tag colorScheme={color}>
                        <TagLeftIcon as={icon} />
                        <TagLabel
                          fontWeight="semibold"
                        >
                          {action.type}
                        </TagLabel>
                      </Tag>
                      {
                        index !== actions.length - 1 && (
                          <ThemeBox
                            border="1px"
                            borderColor="current"
                            borderLeft="0"
                            borderY="0"
                            h="full"
                            left="4"
                            position="absolute"
                            w="0"
                          />
                        )
                      }
                    </Box>

                    <Box flex="1">
                      <Box
                        fontSize="sm"
                        textColor="gray"
                      >
                        {message}
                      </Box>
                    </Box>

                    <Tooltip
                      label={dayjs(action.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                    >
                      <Box
                        fontSize="sm"
                        textColor="gray"
                      >
                        {dayjs(action.timestamp).format('HH:mm:ss')}
                      </Box>
                    </Tooltip>
                  </Flex>
                )
              })
            }
          </VStack>
        </CardSection>
      </Wrapper>
    </ThemeBox>
  )
}

export default EventDetailActions

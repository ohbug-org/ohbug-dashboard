import { Box, Flex, Tag, TagLabel, TagLeftIcon, Text, Tooltip, VStack } from '@chakra-ui/react'
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

const IssueDetailActions: FC<Props> = ({ event }) => {
  const actions = useMemo<OhbugAction[]>(() => [
    ...event?.actions ?? [], {
      type: 'exception',
      timestamp: event.timestamp,
      message: event.detail.message,
      data: event.detail,
    },
  ], [event])
  return (
    <ThemeBox bg="gray">
      <Wrapper>
        <CardSection title="Event Actions">
          <VStack spacing="4">
            {
              actions.map((action) => {
                const { message, icon } = getMessageAndIconByActionType(action)
                return (
                  <Flex
                    align="center"
                    gap="2"
                    justify="space-between"
                    key={action.timestamp + action.data}
                    w="full"
                  >
                    <Box w="36">
                      <Tag>
                        <TagLeftIcon as={icon} />
                        <TagLabel
                          fontWeight="semibold"
                        >
                          {action.type}
                        </TagLabel>
                      </Tag>
                    </Box>

                    <Box flex="1">
                      <Text
                        color="dimmed"
                        size="sm"
                      >
                        {message}
                      </Text>
                    </Box>

                    <Tooltip
                      label={dayjs(action.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                    >
                      <Text
                        color="dimmed"
                        size="sm"
                      >
                        {dayjs(action.timestamp).format('HH:mm:ss')}
                      </Text>
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

export default IssueDetailActions

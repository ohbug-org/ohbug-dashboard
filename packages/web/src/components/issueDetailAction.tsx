import { Box, Center, Flex, Text, Tooltip } from '@chakra-ui/react'
import dayjs from 'dayjs'
import type { FC } from 'react'
import type { OhbugEventLike } from 'common'
import ThemeBox from './themeBox'
import Wrapper from './wrapper'
import { getMessageAndIconByActionType, renderStringOrJson } from '~/libs/utils'

interface Props {
  event: OhbugEventLike
}

const IssueDetailActions: FC<Props> = ({ event }) => {
  return (
    <ThemeBox bg="current">
      <Wrapper>
        {
          event?.actions?.map((action) => {
            const { message, icon } = getMessageAndIconByActionType(action)
            return (
              <Flex
                align="center"
                gap="2"
                justify="space-between"
                key={action.timestamp + action.data}
              >
                <Center>
                  <Box>{icon}</Box>
                  <Text
                    fontWeight="bold"
                    w="80px"
                  >
                    {action.type}
                  </Text>
                </Center>

                <Box flex="1">
                  <Text
                    color="dimmed"
                    size="sm"
                  >
                    {message}
                  </Text>
                </Box>

                <Tooltip
                  label={dayjs(event.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                >
                  <Text
                    color="dimmed"
                    size="sm"
                  >
                    {dayjs(event.timestamp).format('HH:mm:ss')}
                  </Text>
                </Tooltip>
              </Flex>
            )
          })
        }
        <Flex
          align="center"
          gap="2"
          justify="space-between"
        >
          <Center>
            <Box>🐛</Box>
            <Text
              fontWeight="bold"
              w="80px"
            >
            exception
            </Text>
          </Center>

          <Box flex="1">
            <Text
              color="dimmed"
              size="sm"
            >
              {renderStringOrJson(event.detail.message)}
            </Text>
          </Box>

          <Tooltip
            label={dayjs(event.timestamp).format('YYYY-MM-DD HH:mm:ss')}
          >
            <Text
              color="dimmed"
              size="sm"
            >
              {dayjs(event.timestamp).format('HH:mm:ss')}
            </Text>
          </Tooltip>
        </Flex>
      </Wrapper>
    </ThemeBox>
  )
}

export default IssueDetailActions

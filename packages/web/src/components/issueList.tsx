import type { FC } from 'react'
import { useState } from 'react'
import NextLink from 'next/link'
import type { Issue } from 'common'
import { RiTimeLine } from 'react-icons/ri'
import dayjs from 'dayjs'
import useSWR from 'swr'
import { Box, Center, Flex, FormControl, FormLabel, Icon, Link, Switch, Text, Tooltip, useColorModeValue } from '@chakra-ui/react'
import TrendChart from './trendChart'
import ThemeBox from './themeBox'
import type { serviceGetIssuesTrendsReturn } from '~/services/issues'
import { renderStringOrJson } from '~/libs/utils'
import useCurrentProject from '~/hooks/useCurrentProject'

interface Props {
  issues: Issue[]
}
const IssueList: FC<Props> = ({ issues }) => {
  const { projectId } = useCurrentProject()
  const [chartType, setChartType] = useState<'24h' | '14d'>('24h')
  const { data: trends } = useSWR<serviceGetIssuesTrendsReturn>(`/api/trends/issues?ids=${issues.map(issue => issue.id)}&type=${chartType}`)

  const rowHoverBg = useColorModeValue('gray.100', 'dark.500')

  return (
    <Box
      h="full"
      overflowX="hidden"
      overflowY="auto"
      rounded="lg"
      w="full"
    >
      {/* header */}
      <ThemeBox
        bg="gray"
        display="flex"
        px="2"
        py="3"
      >
        <Box w="50%">
          Message
        </Box>

        <Box w="48">
          <FormControl
            alignItems="center"
            display="flex"
          >
            <FormLabel
              htmlFor="trendsType"
              mb="0"
            >
              {chartType === '24h' ? '24小时' : '14天'}
            </FormLabel>
            <Switch
              disabled={!trends}
              id="trendsType"
              isChecked={chartType === '24h'}
              onChange={e => setChartType(e.target.checked ? '24h' : '14d')}
            />
          </FormControl>
        </Box>

        <Center w="20">
          Events
        </Center>

        <Center w="20">
          Users
        </Center>
      </ThemeBox>

      <Box>
        {
          issues.map(issue => (
            <Flex
              _hover={
                { bg: rowHoverBg }
              }
              key={issue.id}
              px="2"
              py="3"
              rounded="sm"
            >
              {/* main */}
              <Box w="50%">
                <NextLink
                  href={
                    {
                      pathname: '/[projectId]/issues/[issueId]',
                      query: { issueId: issue.id, projectId },
                    }
                  }
                >
                  <Link
                    cursor="pointer"
                    display="flex"
                    justifyContent="space-between"
                    noOfLines={1}
                    w="full"
                  >
                    {/* title */}
                    <Box
                      as="span"
                      fontWeight="semibold"
                      mr="2"
                    >
                      {issue.type}
                    </Box>
                    {/* second description */}
                    <Box
                      as="code"
                      textColor="gray.400"
                    >
                      {renderStringOrJson(issue.metadata.filename ?? issue.metadata.others)}
                    </Box>
                  </Link>
                </NextLink>
                {/* message */}
                <Text
                  noOfLines={[1, 2]}
                  textColor="gray.400"
                >
                  {
                    issue.metadata.message && (
                      <code>
                        {renderStringOrJson(issue.metadata.message)}
                      </code>
                    )
                  }
                </Text>
                {/* other message (time/appType/...) */}
                <Box>
                  {/* appType */}
                  {/* time */}
                  <Flex
                    align="center"
                    fontSize="xs"
                  >
                    <Icon
                      as={RiTimeLine}
                      mr="2"
                    />
                    <Tooltip label={`最后出现时间 ${dayjs(issue.updatedAt).format()}`}>
                      {dayjs(issue.updatedAt).fromNow()}
                    </Tooltip>

                    <Box
                      as="span"
                      mx="1"
                    >
                      |
                    </Box>

                    <Tooltip label={`首次出现时间 ${dayjs(issue.createdAt).format()}`}>
                      {dayjs(issue.createdAt).fromNow()}
                    </Tooltip>
                  </Flex>
                </Box>
              </Box>

              <Box w="48">
                <TrendChart
                  data={trends?.[issue.id]}
                  type={chartType}
                />
              </Box>

              <Center w="20">
                {issue._count?.events}
              </Center>

              <Center w="20">
                {issue._count?.users}
              </Center>
            </Flex>
          ))
        }
      </Box>
    </Box>
  )
}

export default IssueList

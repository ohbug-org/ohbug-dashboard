import type { FC, ReactNode } from 'react'
import { useState } from 'react'
import NextLink from 'next/link'
import type { Issue } from 'common'
import { RiTimeLine } from 'react-icons/ri'
import dayjs from 'dayjs'
import useSWR from 'swr'
import { Box, Center, Flex, FormControl, FormLabel, Icon, Link, Switch, Text, Tooltip, useColorModeValue } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import TrendChart from './trendChart'
import ThemeBox from './themeBox'
import type { serviceGetIssuesTrendsReturn } from '~/services/issues'
import { renderStringOrJson } from '~/libs/utils'
import useCurrentProject from '~/hooks/useCurrentProject'

interface Props {
  issues?: Issue[]
  empty: ReactNode
}
const IssueList: FC<Props> = ({ issues, empty }) => {
  const ct = useTranslations('Common')
  const { projectId } = useCurrentProject()
  const [chartType, setChartType] = useState<'24h' | '14d'>('24h')
  const { data: trends } = useSWR<serviceGetIssuesTrendsReturn>(issues ? `/api/trends/issues?ids=${issues.map(issue => issue.id)}&type=${chartType}` : null)

  const rowHoverBg = useColorModeValue('gray.100', 'dark.500')

  return (
    <Box
      h="full"
      overflowX="hidden"
      overflowY="auto"
      w="full"
    >
      {/* header */}
      <ThemeBox
        bg="gray"
        border="1px"
        borderColor="current"
        display="flex"
        overflow="hidden"
        p="2"
        rounded="lg"
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
              {chartType === '24h' ? ct('24h') : ct('14d')}
            </FormLabel>
            <Switch
              disabled={!trends || !issues?.length}
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
      {/* body */}
      <Box>
        {
          issues?.length
            ? issues.map((issue) => {
              const metadata = JSON.parse(issue.metadata) || {}
              return (
                <ThemeBox
                  _hover={
                    { bg: rowHoverBg }
                  }
                  border="1px"
                  borderColor="current"
                  borderTop="none"
                  borderX="none"
                  display="flex"
                  key={issue.id}
                  px="2"
                  py="3"
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
                          {renderStringOrJson(metadata.filename ?? metadata.others)}
                        </Box>
                      </Link>
                    </NextLink>
                    {/* message */}
                    <Text
                      noOfLines={[1, 2]}
                      textColor="gray.400"
                    >
                      {
                        metadata.message && (
                          <code>
                            {renderStringOrJson(metadata.message)}
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
                        <Tooltip
                          aria-label="A tooltip"
                          label={`${ct('lastSeen')} ${dayjs(issue.updatedAt).format('YYYY-MM-DD HH:mm:ss')}`}
                        >
                          {dayjs(issue.updatedAt).fromNow()}
                        </Tooltip>

                        <Box
                          as="span"
                          mx="1"
                        >
                        |
                        </Box>

                        <Tooltip
                          aria-label="A tooltip"
                          label={`${ct('firstSeen')} ${dayjs(issue.createdAt).format('YYYY-MM-DD HH:mm:ss')}`}
                        >
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
                </ThemeBox>
              )
            })
            : empty
        }
      </Box>
    </Box>
  )
}

export default IssueList

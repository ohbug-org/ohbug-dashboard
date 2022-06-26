import dayjs from 'dayjs'
import type { FC } from 'react'
import type { Issue } from 'types'
import { Box, Text } from '@chakra-ui/react'
import TrendChart from './trendChart'
import type { IssueTrend } from '~/services/issues'

interface Props {
  issue: Issue
  trends: {
    '14d': IssueTrend[]
    '24h': IssueTrend[]
  }
}

const IssueDetailTrend: FC<Props> = ({ issue, trends }) => {
  return (
    <Box>
      <Box mb="4">
        {
          trends['14d'] && (
            <TrendChart
              data={trends['14d']}
              title="过去14天"
              type="14d"
            />
          )
        }
      </Box>
      <Box mb="4">
        {
          trends['24h'] && (
            <TrendChart
              data={trends['24h']}
              title="过去24小时"
              type="24h"
            />
          )
        }
      </Box>

      <Box mb="4">
        <Text fontWeight="bold">首次发生</Text>
        <Text color="dimmed">
          {dayjs(issue?.createdAt).fromNow()}
        </Text>
        <Text color="dimmed">
          {dayjs(issue?.createdAt).format('YYYY-MM-DD HH:mm:ss A')}
        </Text>
      </Box>
      <Box mb="4">
        <Text fontWeight="bold">最近发生</Text>
        <Text color="dimmed">
          {dayjs(issue?.updatedAt).fromNow()}
        </Text>
        <Text color="dimmed">
          {dayjs(issue?.updatedAt).format('YYYY-MM-DD HH:mm:ss A')}
        </Text>
      </Box>
    </Box>
  )
}

export default IssueDetailTrend

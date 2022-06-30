import dayjs from 'dayjs'
import type { FC } from 'react'
import type { Issue } from 'common'
import { Box, Stat, StatGroup, StatLabel, StatNumber, Tooltip } from '@chakra-ui/react'
import TrendChart from './trendChart'
import ThemeBox from './themeBox'
import Wrapper from './wrapper'
import CardSection from './cardSection'
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
    <ThemeBox bg="gray">
      <Wrapper>
        <CardSection
          head={
            (
              <StatGroup>
                <Stat>
                  <StatLabel>First Seen</StatLabel>
                  <Tooltip
                    label={dayjs(issue?.createdAt).format('YYYY-MM-DD HH:mm:ss A')}
                    placement="bottom-start"
                  >
                    <StatNumber>
                      {dayjs(issue?.createdAt).fromNow()}
                    </StatNumber>
                  </Tooltip>
                </Stat>
                <Stat>
                  <StatLabel>Last Seen</StatLabel>
                  <Tooltip
                    label={dayjs(issue?.updatedAt).format('YYYY-MM-DD HH:mm:ss A')}
                    placement="bottom-start"
                  >
                    <StatNumber>
                      {dayjs(issue?.updatedAt).fromNow()}
                    </StatNumber>
                  </Tooltip>
                </Stat>
              </StatGroup>
            )
          }
          title="Event Trends"
        >
          <Box
            mb="12"
          >
            {
              trends['14d'] && (
                <TrendChart
                  data={trends['14d']}
                  title="过去14天"
                  type="14d"
                  variant="detail"
                />
              )
            }
          </Box>
          <Box>
            {
              trends['24h'] && (
                <TrendChart
                  data={trends['24h']}
                  title="过去24小时"
                  type="24h"
                  variant="detail"
                />
              )
            }
          </Box>

        </CardSection>
      </Wrapper>
    </ThemeBox>
  )
}

export default IssueDetailTrend

import dayjs from 'dayjs'
import type { FC } from 'react'
import type { Issue } from 'common'
import { Box, Stat, StatGroup, StatLabel, StatNumber, Tooltip } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
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

const EventDetailTrend: FC<Props> = ({ issue, trends }) => {
  const ct = useTranslations('Common')
  return (
    <ThemeBox bg="gray">
      <Wrapper>
        <CardSection
          head={
            (
              <StatGroup>
                <Stat>
                  <StatLabel>{ct('firstSeen')}</StatLabel>
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
                  <StatLabel>{ct('lastSeen')}</StatLabel>
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
                  title={ct('14d')}
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
                  title={ct('24h')}
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

export default EventDetailTrend

'use client'

import { Box, Button, Flex, FormControl, FormLabel, Icon, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Switch, Text, Tooltip } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import type { Event, Project } from '@prisma/client'
import { useMemo, useState } from 'react'
import { RiSettings2Line } from 'react-icons/ri'
import { useTranslations } from 'next-intl'
import Card from '~/components/card'
import ThemeBox from '~/components/themeBox'
import TrendChart from '~/components/trendChart'
import Wrapper from '~/components/wrapper'
import EventsList from '~/components/eventsList'
import type { ProjectTrend } from '~/services/projects'
import Title from '~/components/title'
import { useInfinite } from '~/hooks/useInfinite'
import { serviceGetEventByProjectId } from '~/services/events'
import type { PVGroupResult } from '~/services/views'

interface Props {
  project?: Project
  trends?: {
    '14d': ProjectTrend[]
    '24h': ProjectTrend[]
  }
  views?: {
    pageView: number
    pageViewLastDay: number
    userView: number
    userViewLastDay: number
    activeUser: number
    pvPathGroupResult: PVGroupResult
    pvReferrerGroupResult: PVGroupResult
  }
}

const View = ({ views }: Props) => {
  const t = useTranslations('Profile')
  const pageViewTrend = useMemo(
    () => {
      if (!views) return 100
      return views.pageViewLastDay > 0
        ? ((views.pageView - views.pageViewLastDay) / views.pageViewLastDay * 100).toFixed(2)
        : 100
    },
    [views?.pageView, views?.pageViewLastDay],
  )
  const userViewTrend = useMemo(
    () => {
      if (!views) return 100
      return views.pageViewLastDay > 0
        ? ((views.userView - views.userViewLastDay) / views.userViewLastDay * 100).toFixed(2)
        : 100
    },
    [views?.userView, views?.userViewLastDay],
  )

  if (!(views?.pageView || views?.pageViewLastDay || views?.userView || views?.userViewLastDay)) return null

  return (
    <>
      <Wrapper>
        <Card>
          <StatGroup>
            <Stat>
              <StatLabel>{t('pv')}(PV)</StatLabel>
              <StatNumber>{views?.pageView}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {pageViewTrend}%
              </StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>{t('uv')}(UV)</StatLabel>
              <StatNumber>{views?.userView}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {userViewTrend}%
              </StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>{t('activeUser')}</StatLabel>
              <StatNumber>{views?.activeUser ?? 0}</StatNumber>
            </Stat>
          </StatGroup>
        </Card>
      </Wrapper>
      <Wrapper>
        <Flex gap="8">
          {
            views?.pvPathGroupResult.length > 0 && (
              <Card flex="1">
                <TrendChart
                  data={views?.pvPathGroupResult}
                  name="number"
                  timeField="value"
                  title={
                    (
                      <Tooltip label={t('pageViewsDesc')}>
                        {t('pageViews')}
                      </Tooltip>
                    )
                  }
                  type="14d"
                  variant="row"
                />
              </Card>
            )
          }
          {
            views?.pvReferrerGroupResult.length > 0 && (
              <Card flex="1">
                <TrendChart
                  data={views?.pvReferrerGroupResult}
                  name="number"
                  timeField="value"
                  title={
                    (
                      <Tooltip label={t('referrersDesc')}>
                        {t('referrers')}
                      </Tooltip>
                    )
                  }
                  type="14d"
                  variant="row"
                />
              </Card>
            )
          }
        </Flex>
      </Wrapper>
    </>
  )
}
const Trend = ({ trends }: Props) => {
  const [chartType, setChartType] = useState<'24h' | '14d'>('24h')
  const TrendTitle = useMemo(() => (
    <Flex justify="space-between">
      <Text fontWeight="semibold">Event Trends</Text>
      <FormControl
        alignItems="center"
        display="flex"
        w="auto"
      >
        <FormLabel
          htmlFor="trendsType"
          mb="0"
        >
          {chartType === '24h' ? '24小时' : '14天'}
        </FormLabel>
        <Switch
          id="trendsType"
          isChecked={chartType === '24h'}
          onChange={e => setChartType(e.target.checked ? '24h' : '14d')}
        />
      </FormControl>
    </Flex>
  ), [chartType])

  return (
    <Wrapper>
      <Card>
        <TrendChart
          data={trends?.[chartType]}
          title={TrendTitle}
          type="14d"
          variant="detail"
        />
      </Card>
    </Wrapper>
  )
}
const Events = ({ project }: Props) => {
  const { data, size, setSize, isLoading, isReachingEnd } = useInfinite<Event>(
    index => serviceGetEventByProjectId({ projectId: project!.id, page: index + 1 }),
    {
      enabled: project?.id !== undefined,
      deps: [project?.id],
    },
  )

  return (
    <ThemeBox bg="current">
      <Wrapper>
        <EventsList events={data} />
        <Button
          disabled={isLoading || isReachingEnd}
          mt="6"
          onClick={() => setSize(size + 1)}
          size="sm"
          variant="outline"
          w="full"
        >
          {
            isLoading
              ? 'Loading...'
              : isReachingEnd
                ? 'No More Events'
                : 'Load More'
          }
        </Button>
      </Wrapper>
    </ThemeBox>
  )
}

export default function Profile({ project, trends, views }: Props) {
  return (
    <Box>
      <Title
        rightNodes={
          (
            <Link href={`/${project?.id}/settings`}>
              <Button
                leftIcon={
                  <Icon as={RiSettings2Line} />
                }
                variant="solid"
              >
                Setting
              </Button>
            </Link>
          )
        }
      >
        {project?.name}
      </Title>

      <Box py="8">
        <View views={views} />

        <Trend trends={trends} />
      </Box>

      <Events project={project} />
    </Box>
  )
}

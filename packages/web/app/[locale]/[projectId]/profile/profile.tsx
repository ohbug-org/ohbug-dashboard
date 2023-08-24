'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button, Card, CardBody, Switch, Tooltip } from '@nextui-org/react'
import { type Event, type Project } from '@prisma/client'
import { type ProjectTrend } from '~/services/projects'
import { Box } from '~/components/ui/box'
import TrendChart from '~/components/trend-chart'
import Wrapper from '~/components/wrapper'
import EventsList from '~/components/events-list'
import Title from '~/components/title'
import { useInfinite } from '~/hooks/use-infinite'
import { serviceGetEventByProjectId } from '~/services/events'
import { type PVGroupResult } from '~/services/views'

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
          <CardBody>
            <div className="flex justify-between gap-4">
              <div className="flex flex-col">
                <div className="text-lg">{t('pv')}(PV)</div>
                <div className="text-xl font-semibold">{views?.pageView}</div>
                <div>
                  <i className="i-ri-arrow-up-s" />
                  {pageViewTrend}%
                </div>
              </div>

              <div>
                <div>{t('uv')}(UV)</div>
                <div>{views?.userView}</div>
                <div>
                  <i className="i-ri-arrow-up-s" />
                  {userViewTrend}%
                </div>
              </div>

              <div>
                <div>{t('activeUser')}</div>
                <div>{views?.activeUser ?? 0}</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Wrapper>
      <Wrapper>
        <div className="flex gap-8">
          {
            views?.pvPathGroupResult.length > 0 && (
              <Card className="flex-1">
                <CardBody>
                  <TrendChart
                    data={views?.pvPathGroupResult}
                    name="number"
                    timeField="value"
                    title={
                      (
                        <Tooltip content={t('pageViewsDesc')}>
                          {t('pageViews')}
                        </Tooltip>
                      )
                    }
                    type="14d"
                    variant="row"
                  />
                </CardBody>
              </Card>
            )
          }
          {
            views?.pvReferrerGroupResult.length > 0 && (
              <Card className="flex-1">
                <CardBody>
                  <TrendChart
                    data={views?.pvReferrerGroupResult}
                    name="number"
                    timeField="value"
                    title={
                      (
                        <Tooltip content={t('referrersDesc')}>
                          {t('referrers')}
                        </Tooltip>
                      )
                    }
                    type="14d"
                    variant="row"
                  />
                </CardBody>
              </Card>
            )
          }
        </div>
      </Wrapper>
    </>
  )
}
const Trend = ({ trends }: Props) => {
  const [chartType, setChartType] = useState<'24h' | '14d'>('24h')
  const TrendTitle = useMemo(() => (
    <div className="flex justify-between">
      <div className="font-semibold">Event Trends</div>
      <div className="flex items-center">
        <Switch
          id="trendsType"
          isSelected={chartType === '24h'}
          onValueChange={e => setChartType(e ? '24h' : '14d')}
        >
          {chartType === '24h' ? '24小时' : '14天'}
        </Switch>
      </div>
    </div>
  ), [chartType])

  return (
    <Wrapper>
      <Card>
        <CardBody>
          <TrendChart
            data={trends?.[chartType]}
            title={TrendTitle}
            type="14d"
            variant="detail"
          />
        </CardBody>
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
    <Box>
      <Wrapper>
        <EventsList events={data} />
        <Button
          className="mt-6 w-full"
          disabled={isLoading || isReachingEnd}
          onClick={() => setSize(size + 1)}
          size="sm"
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
    </Box>
  )
}

export default function Profile({ project, trends, views }: Props) {
  return (
    <div>
      <Title
        rightNodes={
          (
            <Link href={`/${project?.id}/settings`}>
              <Button
                startContent={
                  <i className="i-ri-settings-2-line" />
                }
              >
                Setting
              </Button>
            </Link>
          )
        }
      >
        {project?.name}
      </Title>

      <div className="py-8">
        <View views={views} />

        <Trend trends={trends} />
      </div>

      <Events project={project} />
    </div>
  )
}

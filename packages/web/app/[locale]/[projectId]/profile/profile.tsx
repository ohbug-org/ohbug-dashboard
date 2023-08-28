'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
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
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { Switch } from '~/components/ui/switch'
import { Label } from '~/components/ui/label'

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
      <Wrapper className='grid gap-4 grid-cols-3'>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('pv')}(PV)
            </CardTitle>
            <i className='i-ri-bell-line text-stone-500 scale-90'></i>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{views?.pageView}</div>
            <p className="text-xs text-muted-foreground">
              <i className="i-ri-arrow-up-s" />
              {pageViewTrend}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('uv')}(UV)
            </CardTitle>
            <i className='i-ri-user-voice-line text-stone-500 scale-90'></i>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{views?.userView}</div>
            <p className="text-xs text-muted-foreground">
              <i className="i-ri-arrow-up-s" />
              {userViewTrend}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('activeUser')}
            </CardTitle>
            <i className='i-ri-pulse-line text-stone-500 scale-90'></i>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{views?.activeUser ?? 0}</div>
          </CardContent>
        </Card>
      </Wrapper>
      <Wrapper>
        <div className="grid grid-cols-2 gap-8">
          {
            views?.pvPathGroupResult.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-base">{t('pageViews')}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>{t('pageViewsDesc')}</span>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TrendChart
                    data={views?.pvPathGroupResult}
                    name="number"
                    timeField="value"
                    type="14d"
                    variant="row"
                  />
                </CardContent>
              </Card>
            )
          }
          {
            views?.pvReferrerGroupResult.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-base">{t('referrers')}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>{t('referrersDesc')}</span>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TrendChart
                    data={views?.pvReferrerGroupResult}
                    name="number"
                    timeField="value"
                    type="14d"
                    variant="row"
                  />
                </CardContent>
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
      <div className="flex items-center gap-2">
        <Switch
          id="trendsType"
          checked={chartType === '24h'}
          onCheckedChange={e => setChartType(e ? '24h' : '14d')}
        />
        <Label htmlFor="trendsType">{chartType === '24h' ? '24小时' : '14天'}</Label>
      </div>
    </div>
  ), [chartType])

  return (
    <Wrapper>
      <Card>
        <CardHeader>
          <CardTitle>
            {TrendTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TrendChart
            data={trends?.[chartType]}
            type="14d"
            variant="detail"
          />
        </CardContent>
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
              <Button>
                <i className="i-ri-settings-2-line mr-2" /> Setting
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

import { Box, Button, Flex, FormControl, FormLabel, Icon, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Switch, Text } from '@chakra-ui/react'
import type { Event, Project } from '@prisma/client'
import type { GetServerSideProps, NextPage } from 'next'
import type { FC } from 'react'
import { useMemo, useState } from 'react'
import NextLink from 'next/link'
import { RiSettings2Line } from 'react-icons/ri'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import Card from '~/components/card'
import ThemeBox from '~/components/themeBox'
import TrendChart from '~/components/trendChart'
import Wrapper from '~/components/wrapper'
import EventsList from '~/components/eventsList'
import type { ProjectTrend } from '~/services/projects'
import { serviceGetProject, serviceGetProjectTrends } from '~/services/projects'
import Title from '~/components/title'
import { useInfinite } from '~/hooks/useInfinite'
import { serviceGetEventByProjectId } from '~/services/events'
import { serviceGetPageView, serviceGetUserView } from '~/services/views'

interface Props {
  project: Project
  trends: {
    '14d': ProjectTrend[]
    '24h': ProjectTrend[]
  }
  views: {
    pageView: number
    pageViewLastDay: number
    userView: number
    userViewLastDay: number
    activeUser: number
  }
}

export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
  const projectId = parseInt(context.query.projectId as string)
  const project = await serviceGetProject(projectId)
  const trends14d = await serviceGetProjectTrends({ id: projectId, type: '14d' })
  const trends24h = await serviceGetProjectTrends({ id: projectId, type: '24h' })
  const pageView = await serviceGetPageView({ apiKey: project.apiKey })
  const pageViewLastDay = await serviceGetPageView({ apiKey: project.apiKey, expirationDate: dayjs().startOf('date').toDate() })
  const userView = await serviceGetUserView({ apiKey: project.apiKey })
  const userViewLastDay = await serviceGetUserView({ apiKey: project.apiKey, expirationDate: dayjs().startOf('date').toDate() })
  const activeUser = await serviceGetUserView({ apiKey: project.apiKey, startDate: dayjs().subtract(5, 'minute').toDate() })
  return {
    props: {
      project,
      trends: {
        '14d': trends14d,
        '24h': trends24h,
      },
      views: {
        pageView,
        pageViewLastDay,
        userView,
        userViewLastDay,
        activeUser,
      },
    },
  }
}

const View: FC<{ views: Props['views'] }> = ({ views }) => {
  const t = useTranslations('Profile')
  const pageViewTrend = useMemo(
    () => views.pageViewLastDay > 0 ? (views.pageView - views.pageViewLastDay) / views.pageViewLastDay * 100 : 100,
    [views.pageView, views.pageViewLastDay],
  )
  const userViewTrend = useMemo(
    () => views.pageViewLastDay > 0 ? (views.userView - views.userViewLastDay) / views.userViewLastDay * 100 : 100,
    [views.userView, views.userViewLastDay],
  )

  return (
    <Wrapper py="12">
      <Card>
        <StatGroup>
          <Stat>
            <StatLabel>{t('pv')}(PV)</StatLabel>
            <StatNumber>{views.pageView}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              {pageViewTrend}%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>{t('uv')}(UV)</StatLabel>
            <StatNumber>{views.userView}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              {userViewTrend}%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>{t('activeUser')}</StatLabel>
            <StatNumber>{views.activeUser ?? 0}</StatNumber>
          </Stat>
        </StatGroup>
      </Card>
    </Wrapper>
  )
}
const Trend: FC<{ trends: Props['trends'] }> = ({ trends }) => {
  const [chartType, setChartType] = useState<'24h' | '14d'>('24h')
  const TrendTitle = useMemo(() => (
    <Flex justify="space-between">
      <Text fontWeight="semibold">Project Trends</Text>
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
    <Wrapper py="12">
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
const Events: FC<{ project: Props['project'] }> = ({ project }) => {
  const { data, size, setSize, isLoading, isReachingEnd } = useInfinite<Event>(
    index => serviceGetEventByProjectId({ projectId: project.id, page: index + 1 }),
    {
      enabled: project.id !== undefined,
      deps: [project.id],
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

const Profile: NextPage<Props> = ({ project, trends, views }) => {
  return (
    <Box>
      <Title
        rightNodes={
          (
            <NextLink href={`/${project.id}/settings`}>
              <Button
                leftIcon={
                  <Icon as={RiSettings2Line} />
                }
                variant="solid"
              >
                Setting
              </Button>
            </NextLink>
          )
        }
      >
        {project.name}
      </Title>

      <View views={views} />

      <Trend trends={trends} />

      <Events project={project} />
    </Box>
  )
}

export default Profile

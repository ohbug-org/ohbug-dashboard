import { Box, Button, Flex, FormControl, FormLabel, Icon, Switch, Text } from '@chakra-ui/react'
import type { Event, Project } from '@prisma/client'
import type { GetServerSideProps, NextPage } from 'next'
import type { FC } from 'react'
import { useMemo, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import { PAGE_SIZE } from 'common'
import NextLink from 'next/link'
import { RiSettings2Line } from 'react-icons/ri'
import Card from '~/components/card'
import ThemeBox from '~/components/themeBox'
import TrendChart from '~/components/trendChart'
import Wrapper from '~/components/wrapper'
import EventsList from '~/components/eventsList'
import type { ProjectTrend } from '~/services/projects'
import { serviceGetProject, serviceGetProjectTrends } from '~/services/projects'
import Title from '~/components/title'

interface Props {
  project: Project
  trends: {
    '14d': ProjectTrend[]
    '24h': ProjectTrend[]
  }
}

export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
  const projectId = parseInt(context.query.projectId as string)
  const project = await serviceGetProject(projectId)
  const trends14d = await serviceGetProjectTrends({ id: projectId, type: '14d' })
  const trends24h = await serviceGetProjectTrends({ id: projectId, type: '24h' })
  return {
    props: {
      project,
      trends: {
        '14d': trends14d,
        '24h': trends24h,
      },
    },
  }
}

const Trend: FC<{ trends: Props['trends'] }> = ({ trends }) => {
  const [chartType, setChartType] = useState<'24h' | '14d'>('24h')
  const TrendTitle = useMemo(() => (
    <Flex justify="space-between">
      <Text fontWeight="bold">Project Trends</Text>
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
  const { data, error, size, setSize } = useSWRInfinite<Event[]>(index => `/api/events?projectId=${project.id}&page=${index + 1}`)
  const isEmpty = data?.[0]?.length === 0
  const isLoadingInitialData = !data && !error
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
  const events = useMemo(() => data?.flat() ?? [], [data])

  return (
    <ThemeBox bg="current">
      <Wrapper>
        <EventsList events={events} />
        <Button
          disabled={isLoadingMore || isReachingEnd}
          mt="6"
          onClick={() => setSize(size + 1)}
          size="sm"
          variant="outline"
          w="full"
        >
          {
            isLoadingMore
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

const Profile: NextPage<Props> = ({ project, trends }) => {
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

      <Trend trends={trends} />

      <Events project={project} />
    </Box>
  )
}

export default Profile

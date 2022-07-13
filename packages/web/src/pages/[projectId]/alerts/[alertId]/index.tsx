import type { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'
import { Badge, Box, Button, Code, Flex, Tag, Text, Tooltip } from '@chakra-ui/react'
import type { Alert, AlertEvent, Event, Issue } from '@prisma/client'
import { useMemo } from 'react'
import type { Action, ConditionOption, FilterOption } from 'common'
import dayjs from 'dayjs'
import type { AlertEventTrend } from '~/services/alerts'
import { serviceGetAlert, serviceGetAlertEventTrends, serviceGetAlertEvents } from '~/services/alerts'
import ThemeBox from '~/components/themeBox'
import Wrapper from '~/components/wrapper'
import CardSection from '~/components/cardSection'
import Title from '~/components/title'
import useCurrentProject from '~/hooks/useCurrentProject'
import EventsList from '~/components/eventsList'
import { ConditionOptions, FilterOptions } from '~/components/editAlert'
import TrendChart from '~/components/trendChart'

interface Props {
  alert: Alert
  alertEvents: (AlertEvent & {
    event: Event
    issue: Issue
  })[]
  alertEventTrends: AlertEventTrend[]
}

export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
  const alertId = parseInt(context.query.alertId as string)
  const alert = await serviceGetAlert({ id: alertId })
  const alertEvents = await serviceGetAlertEvents(alertId)
  const alertEventTrends = await serviceGetAlertEventTrends({ id: alertId, type: '14d' })
  return { props: { alert, alertEvents, alertEventTrends } }
}

const Detail: NextPage<Props> = ({ alert, alertEvents, alertEventTrends }) => {
  const { projectId } = useCurrentProject()
  const events = useMemo(() => alertEvents.map(item => item.event), [alertEvents])

  return (
    <Flex flexDirection="column">
      <Title
        rightNodes={
          (
            <NextLink href={`/${projectId}/alerts/${alert.id}/edit`}>
              <Button variant="solid">Edit Alert</Button>
            </NextLink>
          )
        }
      >
        {alert.name}
      </Title>

      <ThemeBox bg="gray">
        <Wrapper
          display="flex"
          flexDirection="column"
          gap="12"
        >
          <CardSection title="Conditions">
            {
              alert.recentlyAt && (
                <Box mb="4">
                  <Tooltip label={dayjs(alert.recentlyAt).format('YYYY-MM-DD HH:mm:ss')}>
                    <Tag>{dayjs(alert.recentlyAt).fromNow()}</Tag>
                  </Tooltip>
                </Box>
              )
            }
            <Box mb="4">
              <Flex
                align="center"
                gap="2"
                mb="2"
              >
                <Badge
                  textAlign="center"
                  variant="solid"
                  w="14"
                >
                  WHEN
                </Badge>
                <Text>an event is captured by Ohbug and {alert.conditionMatch} of the following happens</Text>
              </Flex>
              {
                (alert.conditions as unknown as ConditionOption[])?.map((condition) => {
                  return (
                    <Box key={condition.topic}>
                      <Code>
                        {ConditionOptions.find(item => item.topic === condition.topic)?.name}
                      </Code>
                    </Box>
                  )
                })
              }
            </Box>
            <Box mb="4">
              <Flex
                align="center"
                gap="2"
                mb="2"
              >
                <Badge
                  textAlign="center"
                  variant="solid"
                  w="14"
                >
                  IF
                </Badge>
                <Text>{alert.filterMatch} of these filters match</Text>
              </Flex>
              {
                (alert.filters as unknown as FilterOption[])?.map((filter) => {
                  return (
                    <Box key={filter.topic}>
                      <Code>
                        {FilterOptions.find(item => item.topic === filter.topic)?.name}
                      </Code>
                    </Box>
                  )
                })
              }
            </Box>
            <Box mb="4">
              <Flex
                align="center"
                gap="2"
                mb="2"
              >
                <Badge
                  textAlign="center"
                  variant="solid"
                  w="14"
                >
                  THEN
                </Badge>
                <Text>{alert.filterMatch} of these filters match</Text>
              </Flex>
              {
                (alert.actions as unknown as Action[])?.map((action) => {
                  return (
                    <Box key={action.type + action.uri}>
                      <Code>
                        {action.type}: {action.uri}
                      </Code>
                    </Box>
                  )
                })
              }
            </Box>
            <Flex gap="2">
              <Tag>{alert.level}</Tag>
              <Tag>interval: {alert.interval}</Tag>
            </Flex>
          </CardSection>

          <CardSection title="Trends">
            <TrendChart
              data={alertEventTrends}
              name="Alerts"
              type="14d"
              variant="detail"
            />
          </CardSection>

          <CardSection title="Events">
            <EventsList events={events} />
          </CardSection>
        </Wrapper>
      </ThemeBox>
    </Flex>
  )
}

export default Detail

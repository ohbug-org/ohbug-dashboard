'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { type Action, type ConditionOption, type FilterOption } from 'common'
import dayjs from 'dayjs'
import { type Alert, type AlertEvent, type Event, type Issue } from '@prisma/client'
import { ConditionOptions, FilterOptions } from '../edit-alert'
import { type AlertEventTrend } from '~/services/alerts'
import Wrapper from '~/components/wrapper'
import AccordionSection from '~/components/accordion-section'
import Title from '~/components/title'
import useCurrentProject from '~/hooks/use-current-project'
import EventsList from '~/components/events-list'
import TrendChart from '~/components/trend-chart'
import { Button } from '~/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { Badge } from '~/components/ui/badge'

interface Props {
  alert: Alert
  alertEvents: (AlertEvent & {
    event: Event
    issue: Issue
  })[]
  alertEventTrends: AlertEventTrend[]
}

export default function AlertId({ alert, alertEvents, alertEventTrends }: Props) {
  const { projectId } = useCurrentProject()
  const events = useMemo(() => alertEvents.map(item => item.event), [alertEvents])

  return (
    <div className="flex flex-col">
      <Title
        rightNodes={
          (
            <Link href={`/${projectId}/alerts/${alert.id}/edit`}>
              <Button variant="outline">Edit Alert</Button>
            </Link>
        )
        }
      >
        {alert.name}
      </Title>

      <div>
        <Wrapper className="flex flex-col gap-12">
          <AccordionSection
            className="space-y-4"
            title="Conditions"
          >
            {
              alert.recentlyAt
                ? (
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge variant="outline">{dayjs(alert.recentlyAt).fromNow()}</Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>{dayjs(alert.recentlyAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </TooltipContent>
                  </Tooltip>
                  )
                : null
            }
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  className="flex text-center w-14"
                  variant="outline"
                >
                  WHEN
                </Badge>
                <span>an event is captured by Ohbug and {alert.conditionMatch} of the following happens</span>
              </div>
              {
                (alert.conditions as unknown as ConditionOption[])?.map((condition) => {
                  return (
                    <div key={condition.topic}>
                      <code>
                        {ConditionOptions.find(item => item.topic === condition.topic)?.name}
                      </code>
                    </div>
                  )
                })
              }
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  className="flex text-center w-14"
                  variant="outline"
                >
                  IF
                </Badge>
                <span>{alert.filterMatch} of these filters match</span>
              </div>
              {
                (alert.filters as unknown as FilterOption[])?.map((filter) => {
                  return (
                    <div key={filter.topic}>
                      <code>
                        {FilterOptions.find(item => item.topic === filter.topic)?.name}
                      </code>
                    </div>
                  )
                })
              }
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  className="flex text-center w-14"
                  variant="outline"
                >
                  THEN
                </Badge>
                <span>{alert.filterMatch} of these filters match</span>
              </div>
              {
                (alert.actions as unknown as Action[])?.map((action) => {
                  return (
                    <div key={action.type + action.uri}>
                      <code>
                        {action.type}: {action.uri}
                      </code>
                    </div>
                  )
                })
              }
            </div>
            <div className="space-x-2">
              <Badge variant="outline">{alert.level}</Badge>
              <Badge variant="outline">interval: {alert.interval}</Badge>
            </div>
          </AccordionSection>

          <AccordionSection title="Trends">
            <TrendChart
              data={alertEventTrends}
              name="Alerts"
              type="14d"
              variant="detail"
            />
          </AccordionSection>

          <AccordionSection title="Events">
            <EventsList events={events} />
          </AccordionSection>
        </Wrapper>
      </div>
    </div>
  )
}

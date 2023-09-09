'use client'

import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { type Issue } from 'common'
import Wrapper from './wrapper'
import AccordionSection from './accordion-section'
import BarChart from './charts/bar-chart'
import { type IssueTrend } from '~/services/issues'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'

interface Props {
  issue: Issue
  trends: {
    '14d': IssueTrend[]
    '24h': IssueTrend[]
  }
}

export default function EventDetailTrend({ issue, trends }: Props) {
  const ct = useTranslations('Common')
  return (
    <Wrapper>
      <AccordionSection
        title="Event Trends"
        head={
          (
            <div className="flex flex-wrap">
              <div className="flex flex-col">
                <div>{ct('firstSeen')}</div>
                <Tooltip>
                  <TooltipTrigger>
                    <div>
                      {dayjs(issue?.createdAt).fromNow()}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{dayjs(issue?.createdAt).format('YYYY-MM-DD HH:mm:ss A')}</span>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex flex-col">
                <div>{ct('lastSeen')}</div>
                <Tooltip>
                  <TooltipTrigger>
                    <div>
                      {dayjs(issue?.updatedAt).fromNow()}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{dayjs(issue?.updatedAt).format('YYYY-MM-DD HH:mm:ss A')}</span>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
        )
        }
      >
        <div className="mb-12">
          <h3 className="mb-4">{ct('14d')}</h3>
          <div className="h-32">
            <BarChart
              data={trends['14d']}
              nameKey="time"
              tooltipType="a"
              valueKey="count"
            />
          </div>
        </div>
        <div>
          <h3 className="mb-4">{ct('24h')}</h3>
          <div className="h-32">
            <BarChart
              data={trends['24h']}
              nameKey="time"
              tooltipType="b"
              valueKey="count"
            />
          </div>
        </div>
      </AccordionSection>
    </Wrapper>
  )
}

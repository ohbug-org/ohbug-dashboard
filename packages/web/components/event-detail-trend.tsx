'use client'

import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { type Issue } from 'common'
import TrendChart from './trend-chart'
import Wrapper from './wrapper'
import AccordionSection from './card-section'
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
        head={
          (
            <div className='flex flex-wrap'>
              <div className='flex flex-col'>
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
              <div className='flex flex-col'>
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
        title="Event Trends"
      >
        <div className='mb-12'>
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
        </div>
        <div>
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
        </div>
      </AccordionSection>
    </Wrapper>
  )
}

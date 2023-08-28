'use client'

import dayjs from 'dayjs'
import { useMemo } from 'react'
import { type OhbugEventLike } from 'common'
import { type FC } from 'react'
import { type OhbugAction } from '@ohbug/types'
import Wrapper from './wrapper'
import CardSection from './card-section'
import { getMessageAndIconByActionType } from '~/libs/utils'
import { Badge } from '~/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'

interface Props {
  event: OhbugEventLike
}

const EventDetailActions: FC<Props> = ({ event }) => {
  const actions = useMemo<OhbugAction[]>(() => [
    ...event?.actions ?? [], {
      type: 'exception',
      timestamp: event.createdAt as unknown as string,
      message: event.detail.message,
      data: event.detail,
    },
  ], [event])
  return (
    <Wrapper>
      <CardSection title="Event Actions">
        <div className='flex flex-col gap-4 max-h-56 overflow-y-auto'>
          {
            actions.map((action, index) => {
              const { message, icon, color } = getMessageAndIconByActionType(action)
              return (
                <div
                  className='flex items-center justify-between gap-2 w-full'
                  key={action.timestamp + action.data}
                >
                  <div className='relative w-36'>
                    <Badge style={{backgroundColor: color}}>
                      {icon}
                      <span className='font-semibold'>{action.type}</span>
                    </Badge>
                    {
                      index !== actions.length - 1 && (
                        <div className='border-r absolute left-4 h-full w-full' />
                      )
                    }
                  </div>

                  <div className='flex-1'>
                    <span className='text-sm text-stone-500'>{message}</span>
                  </div>

                  <Tooltip>
                    <TooltipTrigger>
                      <span className='text-sm text-stone-500'>
                        {dayjs(action.timestamp).format('HH:mm:ss')}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                    <span>{dayjs(action.timestamp).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )
            })
          }
        </div>
      </CardSection>
    </Wrapper>
  )
}

export default EventDetailActions

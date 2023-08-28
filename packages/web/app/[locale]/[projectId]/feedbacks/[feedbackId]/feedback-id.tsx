'use client'

import { useMemo } from 'react'
import EventDetailActions from '~/components/event-detail-action'
import EventDetailProfile from '~/components/event-detail-profile'
import EventDetailUser from '~/components/event-detail-user'
import CardSection from '~/components/card-section'
import { Box } from '~/components/ui/box'
import Wrapper from '~/components/wrapper'

interface Props {
  feedback: any
}

export default function FeedbackId({ feedback }: Props) {
  const detail = useMemo(() => feedback.detail as any ?? {}, [feedback])

  return (
    <div className='flex flex-col gap-6'>
      <EventDetailProfile event={feedback} />

      <Box>
        <Wrapper>
          <CardSection
            title="Event Detail"
          >
            <div className='flex flex-col'>
              {detail.feedback && <div className='w-full'><Box className='w-24'>Feedback:</Box><code>{detail.feedback}</code></div>}
              {detail.selector && <div className='w-full'><Box className='w-24'>Selector:</Box><code>{detail.selector}</code></div>}
              {detail.outerHTML && <div className='w-full'><Box className='w-24'>outerHTML:</Box><code>{detail.outerHTML}</code></div>}
            </div>
          </CardSection>
        </Wrapper>
      </Box>

      <EventDetailActions event={feedback} />

      <EventDetailUser event={feedback} />
    </div>
  )
}

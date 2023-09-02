'use client'

import { useMemo } from 'react'
import EventDetailActions from '~/components/event-detail-action'
import EventDetailProfile from '~/components/event-detail-profile'
import EventDetailUser from '~/components/event-detail-user'
import AccordionSection from '~/components/accordion-section'
import Wrapper from '~/components/wrapper'

interface Props {
  feedback: any
}

export default function FeedbackId({ feedback }: Props) {
  const detail = useMemo(() => feedback.detail as any ?? {}, [feedback])

  return (
    <div className="flex flex-col gap-6">
      <EventDetailProfile event={feedback} />

      <div>
        <Wrapper>
          <AccordionSection
            title="Event Detail"
          >
            <div className="flex flex-col">
              {detail.feedback ? <div className="w-full"><div className="w-24">Feedback:</div><code>{detail.feedback}</code></div> : null}
              {detail.selector ? <div className="w-full"><div className="w-24">Selector:</div><code>{detail.selector}</code></div> : null}
              {detail.outerHTML ? <div className="w-full"><div className="w-24">outerHTML:</div><code>{detail.outerHTML}</code></div> : null}
            </div>
          </AccordionSection>
        </Wrapper>
      </div>

      <EventDetailActions event={feedback} />

      <EventDetailUser event={feedback} />
    </div>
  )
}

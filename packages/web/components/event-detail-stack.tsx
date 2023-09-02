'use client'

import { type FC } from 'react'
import { type OhbugEventLike } from 'common'
import StackInfo from './stack-info'

import Wrapper from './wrapper'
import AccordionSection from './accordion-section'
import { renderStringOrJson } from '~/libs/utils'

interface Props {
  event: OhbugEventLike
}

const EventDetailStack: FC<Props> = ({ event }) => {
  return (
    <Wrapper>
      <AccordionSection
        collapseTitle="Code"
        title="Error Stack"
        collapse={
            (event.detail.stack && event?.source)
              ? (
                <div className="mb-4">
                  <StackInfo
                    source={event?.source}
                  />
                </div>
                )
              : null
          }
        head={
            event.detail.message ? renderStringOrJson(event.detail.message) : null
          }
      >
        {/* unhandledrejectionError */}
        {/* uncaughtError */}
        <pre className="mt-4 break-words">
          {typeof event.detail.stack === 'string' ? event.detail.stack : JSON.stringify(event.detail.stack)}
        </pre>
        {/* resourceError */}
        {
            event?.detail.selector
              ? (
                <div className="mb-4">
                  {renderStringOrJson(event.detail)}
                </div>
                )
              : null
          }
        {/* ajaxError */}
        {/* fetchError */}
        {
            event?.type === 'ajaxError' && (
              <div className="mb-4">
                {renderStringOrJson(event.detail)}
              </div>
            )
          }
        {/* websocketError */}
        {
            event?.type === 'websocketError' && (
              <div className="mb-4">
                {renderStringOrJson(event.detail)}
              </div>
            )
          }
      </AccordionSection>
    </Wrapper>
  )
}

export default EventDetailStack

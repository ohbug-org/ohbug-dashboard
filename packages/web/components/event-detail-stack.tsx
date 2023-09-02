'use client'

import { type FC } from 'react'
import { type OhbugEventLike } from 'common'
import StackInfo from './stack-info'

import Wrapper from './wrapper'
import AccordionSection from './card-section'
import { renderStringOrJson } from '~/libs/utils'

interface Props {
  event: OhbugEventLike
}

const EventDetailStack: FC<Props> = ({ event }) => {
  return (
    <div>
      <Wrapper>
        <AccordionSection
          collapse={
            (event.detail.stack && event?.source) && (
              <div mb="4">
                <StackInfo
                  source={event?.source}
                />
              </div>
            )
          }
          collapseTitle="Code"
          head={
            event.detail.message && renderStringOrJson(event.detail.message)
          }
          title="Error Stack"
        >
          {/* unhandledrejectionError */}
          {/* uncaughtError */}
          <div
            as="pre"
            mt="4"
            wordBreak="break-word"
          >
            {typeof event.detail.stack === 'string' ? event.detail.stack : JSON.stringify(event.detail.stack)}
          </div>
          {/* resourceError */}
          {
            event?.detail.selector && (
              <div mb="4">
                {renderStringOrJson(event.detail)}
              </div>
            )
          }
          {/* ajaxError */}
          {/* fetchError */}
          {
            event?.type === 'ajaxError' && (
              <div mb="4">
                {renderStringOrJson(event.detail)}
              </div>
            )
          }
          {/* websocketError */}
          {
            event?.type === 'websocketError' && (
              <div mb="4">
                {renderStringOrJson(event.detail)}
              </div>
            )
          }
        </AccordionSection>
      </Wrapper>
    </div>
  )
}

export default EventDetailStack

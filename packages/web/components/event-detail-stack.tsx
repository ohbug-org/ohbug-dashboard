'use client'

import { type FC } from 'react'
import { type OhbugEventLike } from 'common'
import StackInfo from './stack-info'
import { Box } from './ui'
import Wrapper from './wrapper'
import CardSection from './card-section'
import { renderStringOrJson } from '~/libs/utils'

interface Props {
  event: OhbugEventLike
}

const EventDetailStack: FC<Props> = ({ event }) => {
  return (
    <Box>
      <Wrapper>
        <CardSection
          collapse={
            (event.detail.stack && event?.source) && (
              <Box mb="4">
                <StackInfo
                  source={event?.source}
                />
              </Box>
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
          <Box
            as="pre"
            mt="4"
            wordBreak="break-word"
          >
            {typeof event.detail.stack === 'string' ? event.detail.stack : JSON.stringify(event.detail.stack)}
          </Box>
          {/* resourceError */}
          {
            event?.detail.selector && (
              <Box mb="4">
                {renderStringOrJson(event.detail)}
              </Box>
            )
          }
          {/* ajaxError */}
          {/* fetchError */}
          {
            event?.type === 'ajaxError' && (
              <Box mb="4">
                {renderStringOrJson(event.detail)}
              </Box>
            )
          }
          {/* websocketError */}
          {
            event?.type === 'websocketError' && (
              <Box mb="4">
                {renderStringOrJson(event.detail)}
              </Box>
            )
          }
        </CardSection>
      </Wrapper>
    </Box>
  )
}

export default EventDetailStack

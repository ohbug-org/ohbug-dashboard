'use client'

import dynamic from 'next/dynamic'
import { type FC } from 'react'
import { type OhbugEventLike } from 'common'
import { Box } from './ui'
import Wrapper from './wrapper'
import CardSection from './card-section'

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

interface Props {
  event: OhbugEventLike | any
}

const EventDetailUser: FC<Props> = ({ event }) => {
  return (
    <Box>
      <Wrapper>
        <CardSection title="Event User">
          <DynamicReactJson src={event.user} />
        </CardSection>
      </Wrapper>
    </Box>
  )
}

export default EventDetailUser

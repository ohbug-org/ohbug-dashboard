'use client'

import dynamic from 'next/dynamic'
import { type FC } from 'react'
import { type OhbugEventLike } from 'common'

import Wrapper from './wrapper'
import AccordionSection from './card-section'

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

interface Props {
  event: OhbugEventLike | any
}

const EventDetailUser: FC<Props> = ({ event }) => {
  return (
    <div>
      <Wrapper>
        <AccordionSection title="Event User">
          <DynamicReactJson src={event.user} />
        </AccordionSection>
      </Wrapper>
    </div>
  )
}

export default EventDetailUser

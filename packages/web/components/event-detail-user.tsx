'use client'

import dynamic from 'next/dynamic'
import { type OhbugEventLike } from 'common'
import Wrapper from './wrapper'
import AccordionSection from './accordion-section'

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

interface Props {
  event: OhbugEventLike | any
}

export default function EventDetailUser({ event }: Props) {
  return (
    <Wrapper>
      <AccordionSection title="Event User">
        <DynamicReactJson src={event.user} />
      </AccordionSection>
    </Wrapper>
  )
}

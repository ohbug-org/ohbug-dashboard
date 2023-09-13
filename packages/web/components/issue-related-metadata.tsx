'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { type OhbugEventLike } from 'common'
import AccordionSection from './accordion-section'

import Wrapper from './wrapper'

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

interface Props {
  event: OhbugEventLike
  tab: string
}

export default function IssueRelatedMetadata({ event, tab }: Props) {
  const metadata = useMemo(() => {
    if (typeof event.metadata === 'string') {
      return JSON.parse(event.metadata)
    }
    return event.metadata
  }, [event])

  return (
    <Wrapper>
      <AccordionSection title="Custom Metadata">
        <DynamicReactJson src={metadata[tab]} />
      </AccordionSection>
    </Wrapper>
  )
}

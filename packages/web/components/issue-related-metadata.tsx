'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { type OhbugEventLike } from 'common'
import { type FC } from 'react'
import AccordionSection from './card-section'

import Wrapper from './wrapper'

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

interface Props {
  event: OhbugEventLike
  tab: string
}

const IssueRelatedMetadata: FC<Props> = ({ event, tab }) => {
  const metadata = useMemo(() => {
    if (typeof event.metadata === 'string') {
      return JSON.parse(event.metadata)
    }
    return event.metadata
  }, [event])

  return (
    <div>
      <Wrapper>
        <AccordionSection title="Custom Metadata">
          <DynamicReactJson src={metadata[tab]} />
        </AccordionSection>
      </Wrapper>
    </div>
  )
}

export default IssueRelatedMetadata

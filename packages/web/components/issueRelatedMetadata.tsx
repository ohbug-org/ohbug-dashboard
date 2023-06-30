'use client'

import type { OhbugEventLike } from 'common'
import dynamic from 'next/dynamic'
import type { FC } from 'react'
import { useMemo } from 'react'
import CardSection from './cardSection'
import ThemeBox from './themeBox'
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
    <ThemeBox bg="gray">
      <Wrapper>
        <CardSection title="Custom Metadata">
          <DynamicReactJson src={metadata[tab]} />
        </CardSection>
      </Wrapper>
    </ThemeBox>
  )
}

export default IssueRelatedMetadata

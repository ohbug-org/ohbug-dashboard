'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { type OhbugEventLike } from 'common'
import { type FC } from 'react'
import CardSection from './card-section'
import { Box } from '~/components/ui/box'
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
    <Box>
      <Wrapper>
        <CardSection title="Custom Metadata">
          <DynamicReactJson src={metadata[tab]} />
        </CardSection>
      </Wrapper>
    </Box>
  )
}

export default IssueRelatedMetadata

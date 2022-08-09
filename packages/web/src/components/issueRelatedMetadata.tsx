import type { OhbugEventLike } from 'common'
import dynamic from 'next/dynamic'
import type { FC } from 'react'
import CardSection from './cardSection'
import ThemeBox from './themeBox'
import Wrapper from './wrapper'

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

interface Props {
  event: OhbugEventLike
  tab: string
}

const IssueRelatedMetadata: FC<Props> = ({ event, tab }) => {
  return (
    <ThemeBox bg="gray">
      <Wrapper>
        <CardSection title="Custom Metadata">
          <DynamicReactJson src={event.metadata?.[tab]} />
        </CardSection>
      </Wrapper>
    </ThemeBox>
  )
}

export default IssueRelatedMetadata

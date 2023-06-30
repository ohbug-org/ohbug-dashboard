'use client'

import type { FC } from 'react'
import type { OhbugEventLike } from 'common'
import dynamic from 'next/dynamic'
import ThemeBox from './themeBox'
import Wrapper from './wrapper'
import CardSection from './cardSection'

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

interface Props {
  event: OhbugEventLike | any
}

const EventDetailUser: FC<Props> = ({ event }) => {
  return (
    <ThemeBox bg="gray">
      <Wrapper>
        <CardSection title="Event User">
          <DynamicReactJson src={event.user} />
        </CardSection>
      </Wrapper>
    </ThemeBox>
  )
}

export default EventDetailUser

'use client'

import type { OhbugEventLike } from 'common'
import { Box } from '@chakra-ui/react'
import type { FC } from 'react'
import { useRef } from 'react'
import RrwebPlayer from 'rrweb-player'
import { unpack } from 'rrweb'
import { useMount } from 'react-use'
import ThemeBox from '~/components/themeBox'
import Wrapper from '~/components/wrapper'
import 'rrweb-player/dist/style.css'

interface Props {
  event: OhbugEventLike
}

const IssueRelatedRrweb: FC<Props> = ({ event }) => {
  const rootRef = useRef<HTMLDivElement>(null)
  useMount(() => {
    if (rootRef.current && !rootRef.current.children.length) {
      const events = event?.metadata
        ? JSON.parse(event.metadata as unknown as string)?.rrweb ?? []
        : []
      // eslint-disable-next-line no-new
      new RrwebPlayer({
        target: rootRef.current,
        props: { events, unpackFn: unpack },
      })
    }
  })
  return (
    <ThemeBox bg="gray">
      <Wrapper>
        <Box ref={rootRef} />
      </Wrapper>
    </ThemeBox>
  )
}

export default IssueRelatedRrweb

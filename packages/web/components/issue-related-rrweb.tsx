'use client'

import { useRef } from 'react'
import RrwebPlayer from 'rrweb-player'
import { unpack } from 'rrweb'
import { useMount } from 'react-use'
import { type OhbugEventLike } from 'common'

import Wrapper from '~/components/wrapper'
import 'rrweb-player/dist/style.css'

interface Props {
  event: OhbugEventLike
}

export default function IssueRelatedRrweb({ event }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  useMount(() => {
    if (rootRef.current && rootRef.current.children.length === 0) {
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
    <Wrapper>
      <div ref={rootRef} />
    </Wrapper>
  )
}

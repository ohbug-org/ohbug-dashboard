import type { OhbugEventLike } from 'common'
import { Box } from '@chakra-ui/react'
import type { FC } from 'react'
import { useMemo, useRef } from 'react'
import RrwebPlayer from 'rrweb-player'
import { useMount } from 'react-use'
import ThemeBox from '~/components/themeBox'
import Wrapper from '~/components/wrapper'
import 'rrweb-player/dist/style.css'

interface Props {
  event: OhbugEventLike
}

const IssueRelatedRrweb: FC<Props> = ({ event }) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const events = useMemo(
    () => event?.metadata?.rrweb
      ? JSON.parse(JSON.stringify(event.metadata.rrweb))
      : [],
    [event],
  )
  useMount(() => {
    if (rootRef.current && !rootRef.current.children.length) {
      // eslint-disable-next-line no-new
      new RrwebPlayer({
        target: rootRef.current,
        props: { events },
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

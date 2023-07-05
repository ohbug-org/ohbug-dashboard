'use client'

import { Button, HStack } from '@chakra-ui/react'
import Card from '~/components/card'

function History() {
  const pushState = () => {
    window?.history.pushState(null, '', '/dd')
  }
  const replaceState = () => {
    window?.history.replaceState(null, '', '/zz')
  }

  return (
    <Card
      content={
        (
          <HStack>
            <Button onClick={() => pushState()}>pushState</Button>
            <Button onClick={() => replaceState()}>replaceState</Button>
          </HStack>
        )
      }
      title="History"
    />
  )
}

export default History

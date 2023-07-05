'use client'

import { Button, HStack } from '@chakra-ui/react'
import Card from '~/components/card'

function PromiseError() {
  const handlePromise = () => {
    Promise?.reject(new Error('fail'))
  }
  return (
    <Card
      content={
        (
          <HStack>
            <Button onClick={() => handlePromise()}>unhandledrejection error</Button>
          </HStack>
        )
      }
      title="Promise"
    />
  )
}

export default PromiseError

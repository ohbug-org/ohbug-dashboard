'use client'

import { Button, HStack } from '@chakra-ui/react'
import { client } from './mock'
import Card from '~/components/card'

function CustomReport() {
  const handleError = () => {
    try {
      throw new Error('test custom report')
    }
    catch (e: any) {
      const event = client.createEvent({
        category: 'error',
        type: 'message',
        detail: {
          message: e.message,
          stack: e.stack,
        },
      })
      client?.notify(event)
    }
  }
  return (
    <Card
      content={
        (
          <HStack>
            <Button onClick={() => handleError()}>custom report</Button>
          </HStack>
        )
      }
      title="CustomReport"
    />
  )
}

export default CustomReport

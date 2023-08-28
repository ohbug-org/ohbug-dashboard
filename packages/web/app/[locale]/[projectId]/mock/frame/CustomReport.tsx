'use client'

import { Button } from '~/components/ui/button'
import { client } from './index'
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
          <div>
            <Button onClick={() => handleError()}>custom report</Button>
          </div>
        )
      }
      title="CustomReport"
    />
  )
}

export default CustomReport

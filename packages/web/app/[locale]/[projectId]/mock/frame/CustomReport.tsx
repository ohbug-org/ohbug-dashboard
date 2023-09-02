'use client'

import { client } from './index'
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/card'
import { Button } from '~/components/ui/button'

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
    <Card>
      <CardHeader>
        <CardTitle>
          CustomReport
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex'>
          <Button onClick={() => handleError()}>custom report</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CustomReport

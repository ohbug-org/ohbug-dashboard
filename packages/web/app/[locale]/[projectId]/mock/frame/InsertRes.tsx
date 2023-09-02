'use client'

import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/card'
import { Button } from '~/components/ui/button'

export default function InsertRes() {
  const handle = () => {
    const head = document.getElementsByTagName('head')[0]
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://unpkg.com/lodash@4.17.21/lodash.js'
    head.appendChild(script)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          InsertRes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex'>
          <Button onClick={() => handle()}>insert script</Button>
        </div>
      </CardContent>
    </Card>
  )
}

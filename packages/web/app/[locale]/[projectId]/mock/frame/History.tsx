'use client'

import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/card'
import { Button } from '~/components/ui/button'

function History() {
  const pushState = () => {
    window?.history.pushState(null, '', '/dd')
  }
  const replaceState = () => {
    window?.history.replaceState(null, '', '/zz')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex'>
          <Button onClick={() => pushState()}>pushState</Button>
          <Button onClick={() => replaceState()}>replaceState</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default History

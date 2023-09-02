'use client'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'

function PromiseError() {
  const handlePromise = () => {
    Promise?.reject(new Error('fail'))
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Promise
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <Button onClick={() => handlePromise()}>unhandledrejection error</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default PromiseError

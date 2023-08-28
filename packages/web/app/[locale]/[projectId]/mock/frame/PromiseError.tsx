'use client'

import Card from '~/components/card'
import { Button } from '~/components/ui/button'

function PromiseError() {
  const handlePromise = () => {
    Promise?.reject(new Error('fail'))
  }
  return (
    <Card
      content={
        (
          <div>
            <Button onClick={() => handlePromise()}>unhandledrejection error</Button>
          </div>
        )
      }
      title="Promise"
    />
  )
}

export default PromiseError

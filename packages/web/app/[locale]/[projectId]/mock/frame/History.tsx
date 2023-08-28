'use client'

import Card from '~/components/card'
import { Button } from '~/components/ui/button'

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
          <div className='flex'>
            <Button onClick={() => pushState()}>pushState</Button>
            <Button onClick={() => replaceState()}>replaceState</Button>
          </div>
        )
      }
      title="History"
    />
  )
}

export default History

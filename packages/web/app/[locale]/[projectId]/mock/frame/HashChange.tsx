'use client'

import Link from 'next/link'
import Card from '~/components/card'

function HashChange() {
  return (
    <Card
      content={
        (
          <div className='flex'>
            <div>
              <Link href="#app">hash:/#app</Link>
            </div>
            <div>
              <Link href="#dd">hash: /#dd</Link>
            </div>
          </div>
        )
      }
      title="HashChange"
    />
  )
}

export default HashChange

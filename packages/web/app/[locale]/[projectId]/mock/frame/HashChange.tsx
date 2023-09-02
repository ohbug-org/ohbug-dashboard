'use client'

import Link from 'next/link'
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/card'

function HashChange() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          ErrorHashChange
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex'>
          <div>
            <Link href="#app">hash:/#app</Link>
          </div>
          <div>
            <Link href="#dd">hash: /#dd</Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default HashChange

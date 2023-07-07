'use client'

import { HStack } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import Card from '~/components/card'

function HashChange() {
  return (
    <Card
      content={
        (
          <HStack>
            <div>
              <Link href="#app">hash:/#app</Link>
            </div>
            <div>
              <Link href="#dd">hash: /#dd</Link>
            </div>
          </HStack>
        )
      }
      title="HashChange"
    />
  )
}

export default HashChange

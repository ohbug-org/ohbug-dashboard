'use client'

import { Button, HStack } from '@chakra-ui/react'
import Card from '~/components/card'

function randomString(length: number) {
  const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i) {
    result += str[Math.floor(Math.random() * str.length)]
  }
  return result
}

function Error() {
  const handleError = () => {
    const obj = {}
    // @ts-expect-error noop
    // eslint-disable-next-line no-console
    console.log(obj.user.job)
  }

  const handleError1 = () => {
    const user = {}
    // @ts-expect-error noop
    // eslint-disable-next-line no-unused-expressions
    user.detail[randomString(10)]
  }

  return (
    <Card
      content={
        (
          <HStack>
            <Button onClick={() => handleError()}>undefined error</Button>
            <Button onClick={() => handleError1()}>random error</Button>
          </HStack>
        )
      }
      title="Error"
    />
  )
}

export default Error

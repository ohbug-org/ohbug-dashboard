'use client'

import { Button, HStack } from '@chakra-ui/react'
import Card from '~/components/card'

function Ajax() {
  const handleError = () => {
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function() {}
    xmlhttp.open('GET', 'https://api.nancode.cn/http/error?status=511', true)
    xmlhttp.send(JSON.stringify({ a: 123 }))
  }

  const handleTimeOut = () => {
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function() {}
    xmlhttp.timeout = 3000
    xmlhttp.open('GET', 'https://api.nancode.cn/http/delay?delay=5', true)
    xmlhttp.send(JSON.stringify({ a: 1, b: 'i am data' }))
  }

  return (
    <Card
      content={
        (
          <HStack>
            <Button onClick={() => handleError()}>500 error</Button>
            <Button onClick={() => handleTimeOut()}>timeout error</Button>
          </HStack>
        )
      }
      title="AJAX"
    />
  )
}

export default Ajax

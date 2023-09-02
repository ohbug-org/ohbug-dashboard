'use client'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'

function Ajax() {
  const handleError = () => {
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.addEventListener('readystatechange', () => {})
    xmlhttp.open('GET', 'https://api.nancode.cn/http/error?status=511', true)
    xmlhttp.send(JSON.stringify({ a: 123 }))
  }

  const handleTimeOut = () => {
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.addEventListener('readystatechange', () => {})
    xmlhttp.timeout = 3000
    xmlhttp.open('GET', 'https://api.nancode.cn/http/delay?delay=5', true)
    xmlhttp.send(JSON.stringify({ a: 1, b: 'i am data' }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          AJAX
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <Button onClick={() => handleError()}>500 error</Button>
          <Button onClick={() => handleTimeOut()}>timeout error</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Ajax

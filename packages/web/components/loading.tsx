'use client'

import { Center } from '@chakra-ui/react'
import type { FC } from 'react'
import Spinning from './spinning'

const Loading: FC = () => {
  return <Center><Spinning /></Center>
}

export default Loading

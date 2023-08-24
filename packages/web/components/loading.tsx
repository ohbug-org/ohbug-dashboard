'use client'

import type { FC } from 'react'
import Spinning from './spinning'

const Loading: FC = () => {
  return <div className="flex items-center justify-center"><Spinning /></div>
}

export default Loading

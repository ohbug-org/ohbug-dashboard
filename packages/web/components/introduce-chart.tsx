'use client'

import type { ReactNode } from 'react'

interface Props {
  title: string
  value: string | number
  unit?: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}

export default function IntroduceChart({ title, value, unit, description, actions, children }: Props) {
  return (
    <div className='flex items-center gap-2 w-full'>
      <div className='flex flex-col w-[200px]'>
        <div className='text-xl font-bold'>
          {title}
        </div>
        <div className='text-3xl'>
          {value}
          {unit}
        </div>
        <div className='text-stone-500'>{description}</div>
        <div>{actions}</div>
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  )
}

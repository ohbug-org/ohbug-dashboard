'use client'

import type { CSSProperties, ReactNode } from 'react'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

const Wrapper = forwardRef<HTMLDivElement, Props>(({ children, className, style, ...props }, ref) => {
  return (
    <div
      className={twMerge('container mx-auto py-4', className)}
      ref={ref}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
})
Wrapper.displayName = 'Wrapper'
export default Wrapper

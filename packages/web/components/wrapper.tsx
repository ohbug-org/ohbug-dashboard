'use client'

import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { type CSSProperties, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

const Wrapper = forwardRef<HTMLDivElement, Props>(({ children, className, style, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge('container mx-auto py-4', className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
})
Wrapper.displayName = 'Wrapper'
export default Wrapper

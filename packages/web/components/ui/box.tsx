'use client'

import { type CSSProperties, type ReactNode, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export interface BoxProps {
  acrylic?: boolean
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(({ acrylic, className, children, ...props }, ref) => {

  return (
    <div
      className={twMerge('bg-white dark:bg-stone-900', acrylic && 'backdrop-blur', className)}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  )
})
Box.displayName = 'Box'

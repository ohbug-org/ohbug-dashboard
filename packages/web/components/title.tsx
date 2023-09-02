'use client'

import { type ReactNode } from 'react'
import Wrapper from './wrapper'
import { cn } from '~/libs/utils'

interface Props {
  className?: string
  children: ReactNode
  rightNodes?: ReactNode
  bottomNodes?: ReactNode
}

const PADDING = '12'

export default function Title({ className, children, rightNodes, bottomNodes, ...props }: Props) {
  return (
    <Wrapper
      className={cn('flex flex-col justify-between', className)}
      style={{
        paddingBottom: bottomNodes ? '0' : PADDING,
        paddingTop: PADDING,
      }}
      {...props}
    >
      <div className="flex items-center justify-between">
        {
            typeof children === 'string'
              ? (
                <h2 className="text-2xl font-semibold">
                  {children}
                </h2>
                )
              : children
          }
        <div>{rightNodes}</div>
      </div>
      <div style={{ marginTop: bottomNodes ? 6 : 0 }}>{bottomNodes}</div>
    </Wrapper>
  )
}

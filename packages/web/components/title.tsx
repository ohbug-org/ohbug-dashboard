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

export default function Title({ className, children, rightNodes, bottomNodes, ...props }: Props) {
  return (
    <Wrapper
      className={cn('flex flex-col justify-between pt-10', className, {
        'pb-0': !bottomNodes,
        'pb-10': bottomNodes,
      })}
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
      <div
        className={cn({
          'mt-0': !bottomNodes,
          'mt-6': bottomNodes,
        })}
      >
        {bottomNodes}
      </div>
    </Wrapper>
  )
}

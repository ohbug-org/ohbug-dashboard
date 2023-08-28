'use client'

import { type ReactNode } from 'react'
import Wrapper from './wrapper'
import { Box } from '~/components/ui/box'
import { type BoxProps } from '~/components/ui/box'

interface Props extends BoxProps {
  children: ReactNode
  rightNodes?: ReactNode
  bottomNodes?: ReactNode
}

const PADDING = '12'

export default function Title({ children, rightNodes, bottomNodes, ...props }: Props) {
  return (
    <Box
      {...props}
    >
      <Wrapper
        className="flex flex-col justify-between"
        style={
          {
            paddingBottom: bottomNodes ? '0' : PADDING,
            paddingTop: PADDING,
          }
        }
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
    </Box>
  )
}

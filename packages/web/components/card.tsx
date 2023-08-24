'use client'

import { forwardRef, useMemo } from 'react'
import { useColorModeValue } from '@chakra-ui/react'
import { type ReactNode } from 'react'
import { Box } from './ui'
import { type BoxProps } from './ui'

interface Props extends Omit<BoxProps, 'content'> {
  children?: ReactNode
  title?: string
  extra?: ReactNode
  content?: ReactNode
  footer?: ReactNode
  hover?: boolean
  variant?: 'default' | 'shadow'
}
const Card = forwardRef<HTMLDivElement, Props>(({ children, title, extra, content, footer, hover = false, variant = 'default', ...props }, ref) => {
  const node = useMemo(() => {
    if (children) return children
    return (
      <>
        {
          title && (
            <h2
              className="flex justify-between mb-4 text-md"
            >
              {title}
              {extra}
            </h2>
          )
        }
        {
          content && (
            <div className="flex mb-4">
              {content}
            </div>
          )
        }
        {
          footer && (
            <Box

              m="-4"
              mt="0"
              px="4"
              py="3"
            >
              {footer}
            </Box>
          )
        }
      </>
    )
  }, [children, title, content, footer])
  const hoverBorderColor = useColorModeValue('dark.50', 'gray.200')

  return (
    <Box
      _hover={
        hover
          ? {
            boxShadow: 'lg',
            borderColor: variant === 'default' ? hoverBorderColor : 'transparent',
          }
          : {}
      }

      border={variant === 'default' ? '1px' : '0'}
      borderColor={variant === 'default' ? 'current' : 'transparent'}
      boxShadow={variant === 'shadow' ? 'md' : 'none'}
      cursor={hover ? 'pointer' : 'auto'}
      overflow="hidden"
      p="6"
      ref={ref}
      rounded="md"
      transition="all 200ms ease"
      {...props}
    >
      {node}
    </Box>
  )
})
Card.displayName = 'Card'
export default Card

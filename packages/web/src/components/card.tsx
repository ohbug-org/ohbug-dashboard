import { Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { forwardRef, useMemo } from 'react'
import type { ThemeBoxProps } from './themeBox'
import ThemeBox from './themeBox'

interface Props extends ThemeBoxProps {
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
            <Heading
              display="flex"
              justifyContent="space-between"
              mb="4"
              size="md"
            >
              {title}
              {extra}
            </Heading>
          )
        }
        {
          content && (
            <Flex mb="4">
              {content}
            </Flex>
          )
        }
        {
          footer && (
            <ThemeBox
              bg="gray"
              m="-4"
              mt="0"
              px="4"
              py="3"
            >
              {footer}
            </ThemeBox>
          )
        }
      </>
    )
  }, [children, title, content, footer])
  const hoverBorderColor = useColorModeValue('dark.50', 'gray.200')

  return (
    <ThemeBox
      _hover={
        hover
          ? {
            boxShadow: 'lg',
            borderColor: variant === 'default' ? hoverBorderColor : 'transparent',
          }
          : {}
      }
      bg="current"
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
    </ThemeBox>
  )
})
Card.displayName = 'Card'
export default Card

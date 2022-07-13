import type { ContainerProps } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

interface Props extends ContainerProps {
  children: ReactNode
}

const Wrapper = forwardRef<HTMLDivElement, Props>(({ children, ...props }, ref) => {
  return (
    <Container
      maxW="container.xl"
      p="4"
      ref={ref}
      {...props}
    >
      {children}
    </Container>
  )
})
Wrapper.displayName = 'Wrapper'
export default Wrapper

import type { ContainerProps } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'

interface Props extends ContainerProps {
  children: ReactNode
}

const Wrapper: FC<Props> = ({ children, ...props }) => {
  return (
    <Container
      maxW="container.xl"
      p="4"
      {...props}
    >
      {children}
    </Container>
  )
}

export default Wrapper

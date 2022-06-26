import type { BoxProps } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'

interface Props extends BoxProps {
  children: ReactNode
}
const Card: FC<Props> = ({ children, ...props }) => {
  return (
    <Box
      bg="white"
      boxShadow="lg"
      p="4"
      rounded="md"
      {...props}
    >
      {children}
    </Box>
  )
}

export default Card

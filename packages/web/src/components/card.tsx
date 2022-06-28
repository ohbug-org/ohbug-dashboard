import type { BoxProps } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'
import ThemeBox from './themeBox'

interface Props extends BoxProps {
  children: ReactNode
}
const Card: FC<Props> = ({ children, ...props }) => {
  return (
    <ThemeBox
      _hover={
        {
          boxShadow: 'xl',
          borderColor: 'current',
        }
      }
      bg="current"
      border="1px"
      borderColor="transparent"
      boxShadow="lg"
      cursor="pointer"
      p="4"
      rounded="md"
      transition="all 200ms ease"
      {...props}
    >
      {children}
    </ThemeBox>
  )
}

export default Card

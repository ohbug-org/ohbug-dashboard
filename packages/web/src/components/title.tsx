import { Box, Heading } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'
import ThemeBox from './themeBox'
import Wrapper from './wrapper'

interface Props {
  children: ReactNode
  rightNodes?: ReactNode
}

const Title: FC<Props> = ({ children, rightNodes }) => {
  return (
    <ThemeBox
      bg="current"
      borderBottom="1px"
      borderColor="current"
    >
      <Wrapper
        display="flex"
        justifyContent="space-between"
        py="16"
      >
        <Heading>{children}</Heading>
        <Box>{rightNodes}</Box>
      </Wrapper>
    </ThemeBox>
  )
}

export default Title

import type { BoxProps } from '@chakra-ui/react'
import { Box, Heading } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'
import ThemeBox from './themeBox'
import Wrapper from './wrapper'

interface Props extends BoxProps {
  children: ReactNode
  rightNodes?: ReactNode
  bottomNodes?: ReactNode
}

const Title: FC<Props> = ({ children, rightNodes, bottomNodes, ...props }) => {
  return (
    <ThemeBox
      bg="current"
      borderBottom="1px"
      borderColor="current"
      {...props}
    >
      <Wrapper
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        pb={bottomNodes ? '0' : '16'}
        pt="16"
      >
        <Box>
          {typeof children === 'string' ? <Heading>{children}</Heading> : children}
          <Box>{rightNodes}</Box>
        </Box>
        <Box mt="6">{bottomNodes}</Box>
      </Wrapper>
    </ThemeBox>
  )
}

export default Title

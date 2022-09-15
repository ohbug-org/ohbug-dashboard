import { Box, Flex, Heading } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'
import type { ThemeBoxProps } from './themeBox'
import ThemeBox from './themeBox'
import Wrapper from './wrapper'

interface Props extends ThemeBoxProps {
  children: ReactNode
  rightNodes?: ReactNode
  bottomNodes?: ReactNode
}

const PADDING = '12'

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
        pb={bottomNodes ? '0' : PADDING}
        pt={PADDING}
      >
        <Flex
          align="center"
          justify="space-between"
        >
          {
            typeof children === 'string'
              ? (
                <Heading
                  fontWeight="semibold"
                  size="lg"
                >
                  {children}
                </Heading>
              )
              : children
          }
          <Box>{rightNodes}</Box>
        </Flex>
        <Box mt={bottomNodes ? '6' : 0}>{bottomNodes}</Box>
      </Wrapper>
    </ThemeBox>
  )
}

export default Title

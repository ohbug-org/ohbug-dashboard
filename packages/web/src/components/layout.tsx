import { Box } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Box
      as="main"
      h="inherit"
    >
      {children}
    </Box>
  )
}

export default Layout

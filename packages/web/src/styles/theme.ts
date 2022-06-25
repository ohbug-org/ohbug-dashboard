import type { Dict } from '@chakra-ui/utils'
import { extendTheme } from '@chakra-ui/react'

const theme: Dict = extendTheme({
  styles: {
    global: () => ({
      'html, body, #__next': { width: '100%', minHeight: '100vh' },
      'body': { overflowX: 'hidden' },
    }),
  },
})

export default theme

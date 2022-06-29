import type { Dict } from '@chakra-ui/utils'
import { extendTheme } from '@chakra-ui/react'
import type { StyleFunctionProps } from '@chakra-ui/theme-tools'
import { mode } from '@chakra-ui/theme-tools'
import { colors } from './colors'

const theme: Dict = extendTheme({
  colors,
  components: {
    Button: {
      defaultProps: { colorScheme: 'dark' },
      variants: {
        solid: (props: StyleFunctionProps) => ({
          bg: mode('dark.500', 'gray.50')(props),
          _hover: {
            textColor: mode('black', 'white')(props),
            bg: mode('gray.100', 'dark.500')(props),
          },
        }),
        ghost: (props: StyleFunctionProps) => ({
          textColor: mode('black', 'white')(props),
          _hover: {
            textColor: mode('white', 'black')(props),
            bg: mode('dark.500', 'gray.100')(props),
          },
        }),
      },
    },
    Input: {
      variants: {
        outline: (props: StyleFunctionProps) => ({
          borderColor: mode('gray.200', 'dark.50')(props),
          _hover: { borderColor: mode('black', 'white')(props) },
        }),
      },
    },
    Switch: { defaultProps: { colorScheme: 'gray' } },
    Tabs: { defaultProps: { colorScheme: 'dark' } },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      'html, body, #__next': { width: '100%', minHeight: '100vh' },
      'body': {
        bg: mode('white', 'dark.800')(props),
        overflowX: 'hidden',
      },
    }),
  },
})

export default theme

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
        ghost: (props: StyleFunctionProps) => ({ _hover: { bg: mode('gray.100', 'dark.200')(props) } }),
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
    Tabs: {
      variants: {
        'enclosed-colored': (props: StyleFunctionProps) => ({
          tab: {
            borderColor: mode('gray.200', 'dark.50')(props),
            _selected: {
              borderColor: mode('gray.200', 'dark.50')(props),
              borderTopColor: mode('gray.200', 'dark.50')(props),
              borderBottomWidth: '2px',
              borderBottomColor: mode('black', 'white')(props),
              textColor: mode('black', 'white')(props),
            },
          },
          tablist: { borderColor: mode('gray.200', 'dark.50')(props) },
        }),
      },
    },
    Accordion: {
      baseStyle: (props: StyleFunctionProps) => ({
        container: { borderColor: mode('gray.200', 'dark.50')(props) },
        button: {
          py: '4',
          _hover: { bg: mode('gray.200', 'inherit')(props) },
          _expanded: { bg: mode('gray.200', 'inherit')(props) },
        },
        panel: { bg: mode('gray.200', 'inherit')(props) },
      }),
    },
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

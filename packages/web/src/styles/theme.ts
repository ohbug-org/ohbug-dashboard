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
          _hover: { bg: mode('gray.100', 'dark.200')(props) },
          _active: { textColor: 'white' },
        }),
        outline: (props: StyleFunctionProps) => ({
          textColor: mode('gray.400', 'dark.50')(props),
          borderColor: mode('gray.400', 'dark.50')(props),
          _hover: {
            textColor: mode('dark.50', 'gray.50')(props),
            borderColor: mode('dark.50', 'gray.50')(props),
            bg: 'inherit',
          },
          _active: { bg: mode('gray.200', 'dark.50')(props) },
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
    Menu: { baseStyle: (props: StyleFunctionProps) => ({ divider: { borderColor: mode('gray.200', 'dark.50')(props) } }) },
    Link: {
      baseStyle: {
        opacity: 0.6,
        _hover: {
          textDecoration: 'none',
          opacity: 1,
        },
      },
    },
    Breadcrumb: {
      baseStyle: {
        link: {
          opacity: 0.6,
          _hover: {
            textDecoration: 'none',
            opacity: 1,
          },
        },
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

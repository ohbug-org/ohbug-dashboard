import { useColorModeValue } from '@chakra-ui/react'

export function useBgColor({ gray = false, acrylic = false }) {
  if (acrylic) {
    if (gray) return useColorModeValue('gray.50', 'dark.800')
    return useColorModeValue('whiteAlpha.600', 'blackAlpha.600')
  }
  else {
    if (gray) return useColorModeValue('gray.50', 'dark.800')
    return useColorModeValue('white', 'dark.900')
  }
}

export function useBorderColor() {
  return useColorModeValue('gray.200', 'dark.50')
}

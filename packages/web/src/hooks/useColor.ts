import { useColorModeValue } from '@chakra-ui/react'

export function useBgColor(gray = false) {
  if (gray) return useColorModeValue('gray.50', 'dark.800')
  return useColorModeValue('white', 'dark.900')
}

export function useBorderColor() {
  return useColorModeValue('gray.200', 'dark.50')
}

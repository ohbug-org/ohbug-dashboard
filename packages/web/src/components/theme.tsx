import { IconButton, useColorMode } from '@chakra-ui/react'
import type { FC } from 'react'
import { useCallback } from 'react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'

const Theme: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const handleToggleTheme = useCallback(() => {
    toggleColorMode()
  }, [colorMode])

  return (
    <IconButton
      aria-label="toggle theme"
      as={colorMode === 'light' ? RiMoonLine : RiSunLine}
      cursor="pointer"
      display="inline-block"
      h="6"
      onClick={handleToggleTheme}
      textColor={colorMode === 'light' ? 'black' : 'white'}
      variant="ghost"
      w="6"
    />
  )
}

export default Theme

import { Box, IconButton, useToast } from '@chakra-ui/react'
import type { FC } from 'react'
import { useCallback } from 'react'
import { RiClipboardLine } from 'react-icons/ri'
import ThemeBox from './themeBox'

interface Props {
  children: string
}

const Copy: FC<Props> = ({ children }) => {
  const toast = useToast()
  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(children)
      .then(() => {
        toast({ title: 'Copied to clipboard!' })
      })
      .catch(() => {
        toast({
          title: 'Copy to clipboard error!',
          status: 'error',
        })
      })
  }, [])

  return (
    <ThemeBox
      alignItems="center"
      border="1px"
      borderColor="current"
      display="flex"
      justifyContent="space-between"
      px="2"
      py="1"
      rounded="md"
    >
      <Box
        as="pre"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {children}
      </Box>
      <IconButton
        aria-label="copy to clipboard"
        icon={<RiClipboardLine />}
        ml="2"
        onClick={handleClick}
        size="sm"
        variant="ghost"
      />
    </ThemeBox>
  )
}

export default Copy

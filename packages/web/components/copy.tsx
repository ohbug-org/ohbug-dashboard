'use client'

import { Box, IconButton, useToast } from '@chakra-ui/react'
import type { FC } from 'react'
import { useCallback } from 'react'
import { RiClipboardLine } from 'react-icons/ri'
import copy from 'copy-to-clipboard'
import ThemeBox from './themeBox'

interface Props {
  children: string
}

const Copy: FC<Props> = ({ children }) => {
  const toast = useToast()
  const handleClick = useCallback(() => {
    copy(children, {
      format: 'text/plain',
      onCopy() {
        toast({ title: 'Copied to clipboard!' })
      },
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

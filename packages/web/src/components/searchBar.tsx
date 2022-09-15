import type { FC } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useCombobox } from 'downshift'
import { Box, Flex, Input, InputGroup, InputRightElement, Kbd, useColorModeValue } from '@chakra-ui/react'
import { useKey } from 'react-use'
import ThemeBox from './themeBox'
import { useSearchBarActions } from '~/hooks/useSearchBarActions'

const SearchBar: FC = () => {
  const highlightedIndexColor = useColorModeValue('gray.200', 'dark.200')
  const { actions } = useSearchBarActions()
  const [items, setItems] = useState(actions)

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    openMenu,
    closeMenu,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setItems(actions.filter((item) => {
        return (
          !inputValue
          || item.label.toLowerCase().includes(inputValue)
          || item.subtitle?.toLowerCase().includes(inputValue)
          || item.value.toLowerCase().includes(inputValue)
          || item.shortcut.includes(inputValue)
          || item.keywords.includes(inputValue)
        )
      }))
    },
    onSelectedItemChange({ selectedItem }) {
      selectedItem?.perform?.(selectedItem)
    },
    items,
    itemToString(item) {
      return item ? item.label : ''
    },
  })
  const handleInputFocus = useCallback(() => {
    openMenu()
  }, [])
  const handleInputBlur = useCallback(() => {
    closeMenu()
  }, [])
  const inputRef = useRef<HTMLInputElement>(null)
  useKey('/', openMenu)
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [isOpen])

  return (
    <Box
      position="relative"
      transition="width 0.3s ease-in-out"
      w={isOpen ? '400px' : '200px'}
      zIndex="sticky"
    >
      <Flex
        direction="column"
        gap="1"
        w="full"
        {...getComboboxProps()}
      >
        <InputGroup
          w="full"
          {...getComboboxProps()}
        >
          <Input
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            placeholder="Search..."
            variant="filled"
            {...getInputProps()}
            ref={inputRef}
          />
          <InputRightElement>
            <Flex gap="1">
              <Kbd>/</Kbd>
            </Flex>
          </InputRightElement>
        </InputGroup>
      </Flex>
      <ThemeBox
        {...getMenuProps()}
        bg="current"
        boxShadow="md"
        maxH="80"
        overflowY="auto"
        position="absolute"
        rounded="sm"
        w="full"
      >
        {
          isOpen && items.map((item, index) => (
            <Flex
              align="center"
              bg={(highlightedIndex === index || selectedItem === item) ? highlightedIndexColor : 'transparent'}
              cursor="pointer"
              gap="2"
              justify="space-between"
              key={item.value}
              p="3"
              {...getItemProps({ item, index })}
            >
              <Box>
                <span>{item.label}</span>
                <Box
                  color="dimgray"
                  fontSize="sm"
                >
                  {item.subtitle}
                </Box>
              </Box>
              {highlightedIndex === index ? <Box>Jump to <Kbd>↵</Kbd></Box> : (item.icon || null)}
            </Flex>
          ))
        }
      </ThemeBox>
    </Box>
  )
}

export default SearchBar

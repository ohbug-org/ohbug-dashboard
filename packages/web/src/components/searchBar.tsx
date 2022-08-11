import type { FC } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useCombobox } from 'downshift'
import { Box, Flex, Icon, Input, InputGroup, InputRightElement, Kbd, useColorModeValue } from '@chakra-ui/react'
import { RiCloudLine } from 'react-icons/ri'
import { useRouter } from 'next/router'
import { useKey } from 'react-use'
import ThemeBox from './themeBox'
import Loading from './loading'
import { useSearchBarActions } from '~/hooks/useSearchBarActions'
import { useIssuesSearch } from '~/hooks/useIssuesSearch'
import useCurrentProject from '~/hooks/useCurrentProject'

const SearchBar: FC = () => {
  const router = useRouter()
  const { projectId } = useCurrentProject()
  const highlightedIndexColor = useColorModeValue('gray.200', 'dark.200')
  const { actions } = useSearchBarActions()
  const [items, setItems] = useState(actions)
  const [query, setQuery] = useState('')

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
      if (inputValue) setQuery(inputValue)
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
  const { data: searchedIssues, isLoading: searchedIssuesLoading } = useIssuesSearch(!items.length ? query : '')
  useEffect(() => {
    if (Array.isArray(searchedIssues) && searchedIssues.length > 0) {
      setItems(searchedIssues.map(issue => ({
        label: issue.type,
        subtitle: JSON.parse(issue.metadata).message,
        value: issue.id,
        section: 'Issue',
        shortcut: [],
        keywords: [],
        icon: <Icon as={RiCloudLine} />,
        perform: () => {
          router.push({
            pathname: '/[projectId]/issues/[issueId]',
            query: { issueId: issue.id, projectId },
          })
        },
      })))
    }
  }, [searchedIssues, projectId])
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
        {
          searchedIssuesLoading && <Box p="3"><Loading /></Box>
        }
      </ThemeBox>
    </Box>
  )
}

export default SearchBar

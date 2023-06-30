'use client'

import type { FC, ReactNode } from 'react'
import { useCallback, useMemo, useRef, useState } from 'react'
import NextLink from 'next/link'
import type { Issue } from 'common'
import { RiMoreLine, RiSearchLine, RiTimeLine } from 'react-icons/ri'
import dayjs from 'dayjs'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Center, Checkbox, CheckboxGroup, Flex, FormControl, FormLabel, HStack, Icon, IconButton, Input, InputGroup, InputLeftElement, Link, Menu, MenuButton, MenuItem, MenuList, Select, Switch, Text, Tooltip, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { useDebounce, useSet } from 'react-use'
import { useAtom } from 'jotai'
import TrendChart from './trendChart'
import ThemeBox from './themeBox'
import Pagination from './pagination'
import Spinning from './spinning'
import type { SearchIssuesOrderBy } from '~/services/issues'
import { serviceDeleteIssues, serviceGetIssues, serviceGetIssuesTrends } from '~/services/issues'
import { renderStringOrJson } from '~/libs/utils'
import useCurrentProject from '~/hooks/useCurrentProject'
import { useQuery } from '~/hooks/useQuery'
import { useInfinite } from '~/hooks/useInfinite'
import { issueSortAtom } from '~/atoms/issue'

interface Props {
  empty: ReactNode
}
const IssueList: FC<Props> = ({ empty }) => {
  const toast = useToast()
  const t = useTranslations('Issues')
  const ct = useTranslations('Common')
  const { projectId } = useCurrentProject()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const cancelRef = useRef(null)
  const [orderBy, setOrderBy] = useAtom(issueSortAtom)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  useDebounce(
    () => {
      setDebouncedQuery(query)
    },
    500,
    [query],
  )
  const { data, size, setSize, isLoading, isReachingEnd, mutate } = useInfinite<Issue>(
    index => serviceGetIssues({
      page: index + 1,
      projectId: projectId!,
      orderBy,
      query: debouncedQuery,
    }),
    {
      enabled: projectId !== undefined,
      deps: [projectId, orderBy, debouncedQuery],
      pagination: true,
    },
  )
  const [chartType, setChartType] = useState<'24h' | '14d'>('24h')
  const { data: trends } = useQuery(
    () => serviceGetIssuesTrends({
      ids: data!.map(issue => issue.id).join(','),
      type: chartType,
    }),
    {
      enabled: !!data,
      deps: [data, chartType],
    },
  )
  const rowHoverBg = useColorModeValue('gray.100', 'dark.500')

  // handle selected data
  const [checkedItems, checkedItemsActions] = useSet(new Set<string>())
  const allChecked = useMemo(
    () =>
      (checkedItems?.size > 0 && checkedItems?.size === data?.length)
      && Array.from(checkedItems ?? [])
        .every(v => (data?.findIndex(issue => issue.id === v) ?? -1) > -1)
    , [checkedItems, data],
  )
  const isIndeterminate = useMemo(
    () => Array.from(checkedItems ?? [])
      .some(v => (data?.findIndex(issue => issue.id === v) ?? -1) > -1) && !allChecked
    , [checkedItems, data, allChecked],
  )
  const handleDeleteIssue = useCallback(() => {
    const issueIds = Array.from(checkedItems)
    serviceDeleteIssues(issueIds)
      .then(() => {
        toast({
          title: 'Issue Deleted!',
          description: 'Your issues has been deleted!',
          status: 'success',
        })
        mutate()
      })
      .catch((error) => {
        toast({
          title: 'Alert Delete Error',
          description: error.message,
          status: 'error',
        })
      })
      .finally(onClose)
  }, [checkedItems])

  return (
    <Box
      h="full"
      overflowX="hidden"
      overflowY="auto"
      w="full"
    >
      <Box
        mb="4"
        w="full"
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
          >
            {
              isLoading
                ? <Spinning />
                : <RiSearchLine />
            }
          </InputLeftElement>
          <Input
            onChange={e => setQuery(e.target.value)}
            placeholder="Search..."
            value={query}
            variant="filled"
          />
        </InputGroup>
      </Box>

      <CheckboxGroup variant="subtle">
        {/* header */}
        <ThemeBox
          bg="gray"
          border="1px"
          borderColor="current"
          display="flex"
          overflow="hidden"
          p="2"
          rounded="lg"
        >
          <Center mr="2">
            <Checkbox
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              onChange={
                (e) => {
                  const checked = e.target.checked
                  if (checked) {
                    data?.forEach(v => checkedItemsActions?.add(v.id))
                  }
                  else {
                    checkedItemsActions?.reset()
                  }
                }
              }
            />
          </Center>

          <Box w="50%">
            <HStack spacing="2">
              <Select
                onChange={e => setOrderBy(e.target.value as SearchIssuesOrderBy)}
                size="sm"
                value={orderBy}
                w="40"
              >
                <option value="updatedAt">{t('orderByUpdatedAt')}</option>
                <option value="createdAt">{t('orderByCreatedAt')}</option>
                <option value="events">{t('orderByEvents')}</option>
                <option value="users">{t('orderByUsers')}</option>
              </Select>

              <Menu>
                <MenuButton
                  as={IconButton}
                  disabled={checkedItems.size <= 0}
                  icon={<RiMoreLine />}
                  size="sm"
                  variant="outline"
                />
                <MenuList>
                  <MenuItem
                    color="red"
                    onClick={onOpen}
                  >
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Box>

          <Box w="48">
            <FormControl
              alignItems="center"
              display="flex"
            >
              <FormLabel
                htmlFor="trendsType"
                mb="0"
              >
                {chartType === '24h' ? ct('24h') : ct('14d')}
              </FormLabel>
              <Switch
                disabled={!trends || !data?.length}
                id="trendsType"
                isChecked={chartType === '24h'}
                onChange={e => setChartType(e.target.checked ? '24h' : '14d')}
              />
            </FormControl>
          </Box>

          <Center w="20">
            Events
          </Center>

          <Center w="20">
            Users
          </Center>
        </ThemeBox>
        {/* body */}
        <Box>
          {
            data?.length
              ? data.map((issue) => {
                const metadata = JSON.parse(issue.metadata) || {}

                return (
                  <ThemeBox
                    _hover={
                      { bg: rowHoverBg }
                    }
                    border="1px"
                    borderColor="current"
                    borderTop="none"
                    borderX="none"
                    display="flex"
                    key={issue.id}
                    px="2"
                    py="3"
                  >
                    <Center mr="2">
                      <Checkbox
                        isChecked={checkedItems?.has(issue.id)}
                        onChange={
                          (e) => {
                            const checked = e.target.checked
                            if (checked) {
                              checkedItemsActions?.add(issue.id)
                            }
                            else {
                              checkedItemsActions?.reset()
                            }
                          }
                        }
                      />
                    </Center>

                    {/* main */}
                    <Box w="50%">
                      <NextLink
                        href={`/${projectId}/issues/${issue.id}`}
                        passHref
                      >
                        <Link
                          cursor="pointer"
                          display="flex"
                          justifyContent="space-between"
                          noOfLines={1}
                          w="full"
                        >
                          {/* title */}
                          <Box
                            as="span"
                            fontWeight="semibold"
                            mr="2"
                          >
                            {issue.type}
                          </Box>
                          {/* second description */}
                          <Box
                            as="code"
                            textColor="gray.400"
                          >
                            {renderStringOrJson(metadata.filename ?? metadata.others)}
                          </Box>
                        </Link>
                      </NextLink>
                      {/* message */}
                      <Text
                        noOfLines={[1, 2]}
                        textColor="gray.400"
                      >
                        {
                          metadata.message && (
                            <code>
                              {renderStringOrJson(metadata.message)}
                            </code>
                          )
                        }
                      </Text>
                      {/* other message (time/appType/...) */}
                      <Box>
                        {/* appType */}
                        {/* time */}
                        <Flex
                          align="center"
                          fontSize="xs"
                        >
                          <Icon
                            as={RiTimeLine}
                            mr="2"
                          />
                          <Tooltip
                            aria-label="A tooltip"
                            label={`${ct('lastSeen')} ${dayjs(issue.updatedAt).format('YYYY-MM-DD HH:mm:ss')}`}
                          >
                            {dayjs(issue.updatedAt).fromNow()}
                          </Tooltip>

                          <Box
                            as="span"
                            mx="1"
                          >
                        |
                          </Box>

                          <Tooltip
                            aria-label="A tooltip"
                            label={`${ct('firstSeen')} ${dayjs(issue.createdAt).format('YYYY-MM-DD HH:mm:ss')}`}
                          >
                            {dayjs(issue.createdAt).fromNow()}
                          </Tooltip>
                        </Flex>
                      </Box>
                    </Box>

                    <Box w="48">
                      <TrendChart
                        data={trends?.[issue.id]}
                        type={chartType}
                      />
                    </Box>

                    <Center w="20">
                      {issue._count?.events}
                    </Center>

                    <Center w="20">
                      {issue._count?.users}
                    </Center>
                  </ThemeBox>
                )
              })
              : empty
          }
        </Box>
      </CheckboxGroup>

      <Pagination
        isReachingEnd={!!isReachingEnd}
        mt="6"
        onChange={page => setSize(page - 1)}
        page={size + 1}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
            >
              Are you sure you want to delete this {checkedItems.size} issue?
            </AlertDialogHeader>

            <AlertDialogBody>
              {t('deleteIssuesConfirm')}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                onClick={onClose}
                ref={cancelRef}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                bg="red"
                ml={3}
                onClick={handleDeleteIssue}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}

export default IssueList

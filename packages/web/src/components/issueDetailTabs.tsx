import type { FC } from 'react'
import { useCallback, useMemo } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Tab, TabList, Tabs } from '@chakra-ui/react'
import useCurrentProject from '~/hooks/useCurrentProject'

const IssueDetailTabs: FC = () => {
  const router = useRouter()
  const { projectId } = useCurrentProject()
  const list = useMemo(() => [
    {
      label: '详细信息',
      value: 'detail',
      href: '/[projectId]/issues/[issueId]'.replace('[issueId]', router.query.issueId as string).replace('[projectId]', projectId!.toString()),
    },
    {
      label: '事件',
      value: 'events',
      href: '/[projectId]/issues/[issueId]/events'.replace('[issueId]', router.query.issueId as string).replace('[projectId]', projectId!.toString()),
    },
  ], [router, projectId])
  const active = useMemo(() => {
    return list.findIndex(item => item.href === router.route
      .replace('[issueId]', router.query.issueId as string)
      .replace('[projectId]', projectId!.toString()))
  }, [list, router])
  const handleTabChange = useCallback((tabIndex: number) => {
    router.push(list[tabIndex].href)
  }, [list])

  return (
    <Tabs
      defaultIndex={active}
      onChange={handleTabChange}
      // size="sm"
      variant="enclosed-colored"
    >
      <TabList>
        {
          list.map(v => (
            <Tab
              key={v.value}
            >
              <NextLink href={v.href}>
                <a>{v.label}</a>
              </NextLink>
            </Tab>
          ))
        }
      </TabList>
    </Tabs>
  )
}

export default IssueDetailTabs

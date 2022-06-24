import type { FC } from 'react'
import { useCallback, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Tab, TabList, Tabs } from '@chakra-ui/react'

const IssueDetailTabs: FC = () => {
  const router = useRouter()
  const list = useMemo(() => [
    {
      label: '详细信息',
      value: 'detail',
      href: '/issues/[id]'.replace('[id]', router.query.id as string),
    },
    {
      label: '事件',
      value: 'events',
      href: '/issues/[id]/events'.replace('[id]', router.query.id as string),
    },
  ], [router])
  const active = useMemo(() => list.findIndex(item => item.href === router.route.replace('[id]', router.query.id as string)), [list, router])
  const handleTabChange = useCallback((tabIndex: number) => {
    router.push(list[tabIndex].href)
  }, [list])

  return (
    <Tabs
      defaultIndex={active}
      onChange={handleTabChange}
      variant="enclosed"
    >
      <TabList>
        {
          list.map(v => (
            <Tab key={v.value}>
              <Link href={v.href}>
                <a>{v.label}</a>
              </Link>
            </Tab>
          ))
        }
      </TabList>
    </Tabs>
  )
}

export default IssueDetailTabs

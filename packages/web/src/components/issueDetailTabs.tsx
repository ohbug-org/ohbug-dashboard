import type { FC } from 'react'
import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { Link, Tab, TabList, Tabs } from '@chakra-ui/react'
import type { OhbugEventLike } from 'common'
import { useTranslations } from 'next-intl'
import useCurrentProject from '~/hooks/useCurrentProject'

interface Props {
  event: OhbugEventLike
}

const IssueDetailTabs: FC<Props> = ({ event }) => {
  const t = useTranslations('Event')
  const router = useRouter()
  const { projectId } = useCurrentProject()
  const list = useMemo(() => {
    const base = [
      {
        label: t('tabsDetail'),
        value: 'detail',
        tab: 'detail',
      },
      {
        label: t('tabsEvents'),
        value: 'events',
        tab: 'events',
      },
    ]
    if (event.metadata) {
      Object.keys(event.metadata).forEach((key) => {
        base.push({
          label: key,
          value: key,
          tab: key,
        })
      })
    }
    return base
  }, [event, router, projectId])
  const active = useMemo(() => {
    const index = list.findIndex(item => item.tab === router.query.tab)
    return index > 0 ? index : 0
  }, [list, router])
  const handleTabChange = useCallback((index: number) => {
    const item = list[index]
    if (item) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, tab: item.tab },
      })
    }
  }, [list, router])

  return (
    <Tabs
      defaultIndex={active}
      onChange={handleTabChange}
      variant="enclosed-colored"
    >
      <TabList>
        {
          list.map(v => (
            <Tab
              key={v.value}
            >
              <Link>{v.label}</Link>
            </Tab>
          ))
        }
      </TabList>
    </Tabs>
  )
}

export default IssueDetailTabs

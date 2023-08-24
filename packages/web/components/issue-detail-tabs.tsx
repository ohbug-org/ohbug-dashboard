'use client'

import type { FC } from 'react'
import { useCallback, useMemo } from 'react'
import { usePathname, useRouter } from 'next-intl/client'
import { useSearchParams } from 'next/navigation'
import { Link, Tab, TabList, Tabs } from '@chakra-ui/react'
import type { OhbugEventLike } from 'common'
import { useTranslations } from 'next-intl'
import useCurrentProject from '~/hooks/use-current-project'

interface Props {
  event: OhbugEventLike
}

const IssueDetailTabs: FC<Props> = ({ event }) => {
  const t = useTranslations('Event')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
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
    let metadata = null
    try {
      metadata = JSON.parse(event.metadata as unknown as string)
    }
    catch (_) {}
    if (metadata) {
      Object.keys(metadata).forEach((key) => {
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
    const index = list.findIndex(item => item.tab === tab)
    return index > 0 ? index : 0
  }, [list, tab])
  const handleTabChange = useCallback((index: number) => {
    const item = list[index]
    if (item) {
      router.push(`${pathname}?tab=${item.tab}`)
    }
  }, [list, pathname])

  return (
    <Tabs
      index={active}
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

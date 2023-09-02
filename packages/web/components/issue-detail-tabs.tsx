'use client'

import { useCallback, useMemo } from 'react'
import { usePathname, useRouter } from 'next-intl/client'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { type OhbugEventLike } from 'common'
import useCurrentProject from '~/hooks/use-current-project'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'

interface Props {
  event: OhbugEventLike
}

export default function IssueDetailTabs({ event }: Props) {
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
    catch {}
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
    const value = list.find(item => item.tab === tab)?.value
    return value
  }, [list, tab])
  const handleTabChange = useCallback((value: string) => {
    const item = list.find(v => v.value === value)
    if (item) {
      router.push(`${pathname}?tab=${item.tab}`)
    }
  }, [list, pathname])

  return (
    <Tabs
      value={active}
      onValueChange={handleTabChange}
    >
      <TabsList>
        {
          list.map(v => (
            <TabsTrigger
              key={v.value}
              value={v.value}
            >
              <a>{v.label}</a>
            </TabsTrigger>
          ))
        }
      </TabsList>
    </Tabs>
  )
}

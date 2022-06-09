import type { FC } from 'react'
import { useMemo } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

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

  return (
    <div className="tabs">
      {
        list.map(v => (
          <Link
            href={v.href}
            key={v.value}
          >
            <a className={clsx('tab tab-lifted', { 'tab-active': router.route.replace('[id]', router.query.id as string) === v.href })}>
              {v.label}
            </a>
          </Link>
        ))
      }
    </div>
  )
}

export default IssueDetailTabs

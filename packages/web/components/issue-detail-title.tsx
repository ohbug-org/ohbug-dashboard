'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { type Issue, type OhbugEventLike } from 'common'
import Title from './title'
import IssueDetailTabs from './issue-detail-tabs'
import { renderStringOrJson } from '~/libs/utils'
import { Badge } from '~/components/ui/badge'

interface Props {
  issue: Issue
  event: OhbugEventLike
}

export default function IssueDetailTitle({ issue, event }: Props) {
  const t = useTranslations('Event')
  const metadata = useMemo(() => JSON.parse(issue.metadata) || {}, [issue])
  return (
    <Title
      className='sticky top-12 z-50'
      bottomNodes={
        <IssueDetailTabs event={event} />
      }
      rightNodes={
        (
          <div className='flex'>
            <div className='flex flex-col'>
              <div>{t('titleEvents')}</div>
              <div>{issue._count?.events}</div>
            </div>
            <div className='flex flex-col'>
              <div>{t('titleUsers')}</div>
              <div>{issue._count?.users}</div>
            </div>
          </div>
        )
      }
    >
      <div>
        <a className='line-clamp-2'>
          <span className='font-semibold mr-2'>
            {issue.type}
          </span>
          {
            issue.releaseStage === 'mock' && (
              <Badge variant="destructive" className='mr-2'>
                Mock
              </Badge>
            )
          }
          <code className='text-stone-500'>
            {renderStringOrJson(metadata.filename ?? metadata.others)}
          </code>
        </a>
        <div className='line-clamp-2 text-stone-500'>
          {
            metadata.message && (
              <code>
                {renderStringOrJson(metadata.message)}
              </code>
            )
          }
        </div>
      </div>
    </Title>
  )
}

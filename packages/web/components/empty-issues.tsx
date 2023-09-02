'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'
import useCurrentProject from '~/hooks/use-current-project'
import { Button } from '~/components/ui/button'

const EmptyIssues: FC = () => {
  const { projectId } = useCurrentProject()
  const t = useTranslations('Issues.Empty')
  return (
    <div className="flex flex-col gap-4 p-6">
      <div>{t('gettingStarted')}</div>
      <div>
        <Link
          href="https://ohbug.net/guide/getting-started.html"
          target="_blank"
        >
          <Button>
            <i className="i-ri-external-link-line mr-2" /> Getting Started
          </Button>
        </Link>
      </div>
      <div>{t('getApiKey')}</div>
      <Link
        href={`/${projectId}/settings`}
      >
        Get apiKey
      </Link>
      <div>{t('needMockData')}</div>
      <Link
        href={`/${projectId}/mock`}
      >
        Mock
      </Link>
    </div>
  )
}

export default EmptyIssues

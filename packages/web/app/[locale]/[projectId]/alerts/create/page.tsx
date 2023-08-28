'use client'

import { useCallback } from 'react'
import type { OmitAlert } from 'common'
import { useRouter } from 'next-intl/client'
import { useTranslations } from 'next-intl'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/use-current-project'
import EditAlert from '~/components/edit-alert'
import { serviceCreateAlert } from '~/services/alerts'
import { useToast } from '~/components/ui/use-toast'

export default function CreatePage() {
  const t = useTranslations('Alerts')
  const router = useRouter()
  const { projectId } = useCurrentProject()
  const {toast} = useToast()
  const onSubmit = useCallback((value: OmitAlert) => {
    serviceCreateAlert({ ...value, projectId: projectId! })
      .then(() => {
        toast({
          title: 'Alert Created!',
          description: 'Your alert has been created!',
        })
        router.back()
      })
      .catch((error) => {
        toast({
          title: 'Alert Create Error',
          description: error.message,
          variant: 'destructive',
        })
      })
  }, [projectId])

  return (
    <div>
      <Title>{t('createAlert')}</Title>

      <Wrapper>
        <EditAlert onSubmit={onSubmit} />
      </Wrapper>
    </div>
  )
}

'use client'

import { useCallback } from 'react'
import { useRouter } from 'next-intl/client'
import { useTranslations } from 'next-intl'
import { type z } from 'zod'
import EditAlert from '../edit-alert'
import { type formSchema } from '../edit-alert'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/use-current-project'
import { serviceCreateAlert } from '~/services/alerts'
import { useToast } from '~/components/ui/use-toast'

export default function CreatePage() {
  const t = useTranslations('Alerts')
  const router = useRouter()
  const { projectId } = useCurrentProject()
  const { toast } = useToast()
  const onSubmit = useCallback((value: z.infer<typeof formSchema>) => {
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

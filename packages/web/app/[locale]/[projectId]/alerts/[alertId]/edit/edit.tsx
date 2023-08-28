'use client'

import { useCallback } from 'react'
import type { OmitAlert } from 'common'
import { useRouter } from 'next-intl/client'
import { useSearchParams } from 'next/navigation'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import EditAlert from '~/components/edit-alert'
import { serviceUpdateAlert } from '~/services/alerts'
import { useToast } from '~/components/ui/use-toast'

interface Props {
  alert: OmitAlert
}

export default function Edit({ alert }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const alertId = searchParams.get('alertId')
  const {toast} = useToast()
  const onSubmit = useCallback((value: OmitAlert) => {
    serviceUpdateAlert(parseInt(alertId as string), value)
      .then(() => {
        toast({
          title: 'Alert Edited!',
          description: 'Your alert has been edited!',
        })
        router.back()
      })
      .catch((error) => {
        toast({
          title: 'Alert Edit Error',
          description: error.message,
          variant: 'destructive',
        })
      })
  }, [alertId])

  return (
    <div>
      <Title>Edit Alerts</Title>

      <Wrapper>
        <EditAlert
          alert={alert}
          onSubmit={onSubmit}
        />
      </Wrapper>
    </div>
  )
}

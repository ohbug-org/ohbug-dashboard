'use client'

import { useCallback } from 'react'
import { useRouter } from 'next-intl/client'
import { useSearchParams } from 'next/navigation'
import { type OmitAlert } from 'common'
import { type z } from 'zod'
import EditAlert from '../../edit-alert'
import { type formSchema } from '../../edit-alert'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import { serviceUpdateAlert } from '~/services/alerts'
import { useToast } from '~/components/ui/use-toast'

interface Props {
  alert: OmitAlert
}

export default function Edit({ alert }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const alertId = searchParams.get('alertId')
  const { toast } = useToast()
  const onSubmit = useCallback((value: z.infer<typeof formSchema>) => {
    serviceUpdateAlert(Number.parseInt(alertId as string), value)
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

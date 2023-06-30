'use client'

import { Box, useToast } from '@chakra-ui/react'
import { useCallback } from 'react'
import type { OmitAlert } from 'common'
import { useRouter } from 'next-intl/client'
import { useSearchParams } from 'next/navigation'
import Card from '~/components/card'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import EditAlert from '~/components/editAlert'
import { serviceUpdateAlert } from '~/services/alerts'

interface Props {
  alert: OmitAlert
}

export default function Edit({ alert }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const alertId = searchParams.get('alertId')
  const toast = useToast()
  const onSubmit = useCallback((value: OmitAlert) => {
    serviceUpdateAlert(parseInt(alertId as string), value)
      .then(() => {
        toast({
          title: 'Alert Edited!',
          description: 'Your alert has been edited!',
          status: 'success',
        })
        router.back()
      })
      .catch((error) => {
        toast({
          title: 'Alert Edit Error',
          description: error.message,
          status: 'error',
        })
      })
  }, [alertId])

  return (
    <Box>
      <Title>Edit Alerts</Title>

      <Wrapper
        display="flex"
        flexDirection="column"
        gap="12"
        py="12"
      >
        <Card>
          <EditAlert
            alert={alert}
            onSubmit={onSubmit}
          />
        </Card>
      </Wrapper>
    </Box>
  )
}

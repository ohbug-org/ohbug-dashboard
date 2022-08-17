import { Box, useToast } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useCallback } from 'react'
import type { OmitAlert } from 'common'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import Card from '~/components/card'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/useCurrentProject'
import EditAlert from '~/components/editAlert'
import { serviceCreateAlert } from '~/services/alerts'

const Create: NextPage = () => {
  const t = useTranslations('Alerts')
  const router = useRouter()
  const { projectId } = useCurrentProject()
  const toast = useToast()
  const onSubmit = useCallback((value: OmitAlert) => {
    serviceCreateAlert({ ...value, projectId: projectId! })
      .then(() => {
        toast({
          title: 'Alert Created!',
          description: 'Your alert has been created!',
          status: 'success',
        })
        router.back()
      })
      .catch((error) => {
        toast({
          title: 'Alert Create Error',
          description: error.message,
          status: 'error',
        })
      })
  }, [projectId])

  return (
    <Box>
      <Title>{t('createAlert')}</Title>

      <Wrapper
        display="flex"
        flexDirection="column"
        gap="12"
        py="12"
      >
        <Card>
          <EditAlert onSubmit={onSubmit} />
        </Card>
      </Wrapper>
    </Box>
  )
}

export default Create

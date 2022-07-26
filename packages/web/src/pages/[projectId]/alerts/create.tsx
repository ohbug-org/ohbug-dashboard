import { Box } from '@chakra-ui/react'
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

const Create: NextPage = () => {
  const t = useTranslations('Alerts')
  const router = useRouter()
  const { projectId } = useCurrentProject()
  const onSubmit = useCallback((data: OmitAlert) => {
    fetch(
      '/api/alerts',
      {
        method: 'POST',
        body: JSON.stringify({ ...data, projectId }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      },
    )
      .then(res => res.json())
      .then((alert) => {
        if (alert) router.back()
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

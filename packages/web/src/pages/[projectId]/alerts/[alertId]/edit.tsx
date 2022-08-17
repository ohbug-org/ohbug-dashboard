import { Box, useToast } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import { useCallback } from 'react'
import type { OmitAlert } from 'common'
import { useRouter } from 'next/router'
import Card from '~/components/card'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import EditAlert from '~/components/editAlert'
import { serviceGetAlert, serviceUpdateAlert } from '~/services/alerts'

interface Props {
  alert: OmitAlert
}

export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
  const alertId = parseInt(context.query.alertId as string)
  const alert = (await serviceGetAlert({ id: alertId })) as unknown as OmitAlert
  return { props: { alert } }
}

const Edit: NextPage<Props> = ({ alert }) => {
  const router = useRouter()
  const toast = useToast()
  const onSubmit = useCallback((value: OmitAlert) => {
    serviceUpdateAlert(parseInt(router.query.alertId as string), value)
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
  }, [router.query.alertId])

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

export default Edit

import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useCallback, useMemo } from 'react'
import type { OmitAlert } from 'common'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Card from '~/components/card'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/useCurrentProject'
import EditAlert from '~/components/editAlert'
import Loading from '~/components/loading'

const Edit: NextPage = () => {
  const router = useRouter()
  const { projectId } = useCurrentProject()
  const { data } = useSWR(router.query.alertId ? `/api/alerts/${router.query.alertId}` : null)
  const loading = useMemo(() => !data, [data])
  const onSubmit = useCallback((data: OmitAlert) => {
    fetch(
      `/api/alerts/${router.query.alertId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ ...data, projectId }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      },
    )
      .then(res => res.json())
      .then((alert) => {
        if (alert) router.back()
      })
  }, [projectId, router.query.alertId])

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
          {
            loading
              ? <Loading />
              : (
                <EditAlert
                  alert={data}
                  onSubmit={onSubmit}
                />
              )
          }
        </Card>
      </Wrapper>
    </Box>
  )
}

export default Edit

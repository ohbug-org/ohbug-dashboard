'use client'

import { Box, Button } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import type { Alert } from '@prisma/client'
import { useTranslations } from 'next-intl'
import Card from '~/components/card'
import AlertsList from '~/components/alertList'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/useCurrentProject'
import { useInfinite } from '~/hooks/useInfinite'
import LoadingMoreButton from '~/components/loadMoreButton'
import { serviceGetAlerts } from '~/services/alerts'

const Alerts = () => {
  const t = useTranslations('Alerts')
  const { projectId } = useCurrentProject()
  const { data, isLoading, size, setSize, isReachingEnd, mutate } = useInfinite<Alert>(
    index => serviceGetAlerts({
      page: index + 1,
      projectId: projectId!,
    }),
    {
      enabled: projectId !== undefined,
      deps: [projectId],
    },
  )

  return (
    <Box>
      <Title
        rightNodes={
          (
            <Link href={`/${projectId}/alerts/create`}>
              <Button variant="solid">{t('createAlert')}</Button>
            </Link>
          )
        }
      >
        Alerts
      </Title>

      <Wrapper
        display="flex"
        flexDirection="column"
        gap="12"
        py="12"
      >
        <Card>
          {
            data && (
              <AlertsList
                alerts={data}
                mutate={mutate}
              />
            )
          }
          <LoadingMoreButton
            isLoading={isLoading}
            isReachingEnd={isReachingEnd}
            onClick={() => setSize(size + 1)}
          />
        </Card>
      </Wrapper>
    </Box>
  )
}

export default Alerts

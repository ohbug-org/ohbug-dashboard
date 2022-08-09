import { Box, Button } from '@chakra-ui/react'
import type { Alert } from '@prisma/client'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import { useTranslations } from 'next-intl'
import Card from '~/components/card'
import AlertsList from '~/components/alertList'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/useCurrentProject'
import { useInfinite } from '~/hooks/useInfinite'
import LoadingMoreButton from '~/components/loadMoreButton'

const Alerts: NextPage = () => {
  const t = useTranslations('Alerts')
  const { projectId } = useCurrentProject()
  const { data, isLoading, size, setSize, isReachingEnd, mutate } = useInfinite<Alert>(index => `/api/alerts?projectId=${projectId}&page=${index + 1}`)

  return (
    <Box>
      <Title
        rightNodes={
          (
            <NextLink href={`/${projectId}/alerts/create`}>
              <Button variant="solid">{t('createAlert')}</Button>
            </NextLink>
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
          <AlertsList
            alerts={data}
            mutate={mutate}
          />
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

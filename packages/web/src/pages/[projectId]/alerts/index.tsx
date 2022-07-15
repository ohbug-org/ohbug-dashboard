import { Box, Button } from '@chakra-ui/react'
import type { Alert } from '@prisma/client'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import Card from '~/components/card'
import AlertsList from '~/components/alertList'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/useCurrentProject'
import { useInfinite } from '~/hooks/useInfinite'

const Alerts: NextPage = () => {
  const { projectId } = useCurrentProject()
  const { data, isLoading, size, setSize, isReachingEnd } = useInfinite<Alert>(index => `/api/alerts?projectId=${projectId}&page=${index + 1}`)

  return (
    <Box>
      <Title
        rightNodes={
          (
            <NextLink href={`/${projectId}/alerts/create`}>
              <Button variant="solid">Create Alert</Button>
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
          <AlertsList alerts={data} />
          <Button
            disabled={isLoading || isReachingEnd}
            mt="6"
            onClick={() => setSize(size + 1)}
            size="sm"
            variant="outline"
            w="full"
          >
            {
              isLoading
                ? 'Loading...'
                : isReachingEnd
                  ? 'No More Events'
                  : 'Load More'
            }
          </Button>
        </Card>
      </Wrapper>
    </Box>
  )
}

export default Alerts

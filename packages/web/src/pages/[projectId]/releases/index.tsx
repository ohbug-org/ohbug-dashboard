import { Box, Button } from '@chakra-ui/react'
import type { Release } from '@prisma/client'
import { PAGE_SIZE } from 'common'
import type { NextPage } from 'next'
import { useMemo } from 'react'
import useSWRInfinite from 'swr/infinite'
import Card from '~/components/card'
import ReleaseList from '~/components/releaseList'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/useCurrentProject'

const Releases: NextPage = () => {
  const { projectId } = useCurrentProject()
  const { data, error, size, setSize } = useSWRInfinite<Release[]>(index => `/api/releases?projectId=${projectId}&page=${index + 1}`)
  const isEmpty = data?.[0]?.length === 0
  const isLoadingInitialData = !data && !error
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
  const releases = useMemo(() => data?.flat() ?? [], [data])

  return (
    <Box>
      <Title>Releases</Title>

      <Wrapper
        display="flex"
        flexDirection="column"
        gap="12"
        py="12"
      >
        <Card hover={false}>
          <ReleaseList releases={releases} />
          <Button
            disabled={isLoadingMore || isReachingEnd}
            mt="6"
            onClick={() => setSize(size + 1)}
            size="sm"
            variant="outline"
            w="full"
          >
            {
              isLoadingMore
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

export default Releases

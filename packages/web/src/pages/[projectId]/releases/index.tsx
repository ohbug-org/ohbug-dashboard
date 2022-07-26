import { Box } from '@chakra-ui/react'
import type { Release } from '@prisma/client'
import type { NextPage } from 'next'
import Card from '~/components/card'
import LoadingMoreButton from '~/components/loadMoreButton'
import ReleaseList from '~/components/releaseList'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/useCurrentProject'
import { useInfinite } from '~/hooks/useInfinite'

const Releases: NextPage = () => {
  const { projectId } = useCurrentProject()
  const { data, isLoading, size, setSize, isReachingEnd } = useInfinite<Release>(index => `/api/releases?projectId=${projectId}&page=${index + 1}`)

  return (
    <Box>
      <Title>Releases</Title>

      <Wrapper
        display="flex"
        flexDirection="column"
        gap="12"
        py="12"
      >
        <Card>
          <ReleaseList releases={data} />
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

export default Releases

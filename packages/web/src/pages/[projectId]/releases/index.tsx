import { Box, Button } from '@chakra-ui/react'
import type { Release } from '@prisma/client'
import type { NextPage } from 'next'
import Card from '~/components/card'
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

export default Releases

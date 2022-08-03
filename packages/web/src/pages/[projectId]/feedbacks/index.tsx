import { Button } from '@chakra-ui/react'
import type { Feedback } from '@prisma/client'
import type { NextPage } from 'next'
import { useTranslations } from 'next-intl'
import FeedbacksList from '~/components/feedbacksList'
import ThemeBox from '~/components/themeBox'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/useCurrentProject'
import { useInfinite } from '~/hooks/useInfinite'

const Feedbacks: NextPage = () => {
  const ct = useTranslations('Common')
  const { projectId } = useCurrentProject()
  const { data: feedbacks, isLoading, size, setSize, isReachingEnd } = useInfinite<Feedback>(index => `/api/feedbacks?projectId=${projectId}&page=${index + 1}`)

  return (
    <ThemeBox bg="current">
      <Title>
        Feedbacks
      </Title>

      <Wrapper>
        <FeedbacksList feedbacks={feedbacks} />
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
              ? `${ct('loading')}...`
              : isReachingEnd
                ? ct('noMoreData')
                : ct('loadMore')
          }
        </Button>
      </Wrapper>
    </ThemeBox>
  )
}

export default Feedbacks

'use client'

import { Button, Icon, Link } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { RiQuestionLine } from 'react-icons/ri'
import { type EventUser, type Feedback } from '@prisma/client'
import FeedbacksList from '~/components/feedbacks-list'
import { Box } from '~/components/ui/box'
import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/use-current-project'
import { useInfinite } from '~/hooks/use-infinite'
import { serviceGetFeedbacks } from '~/services/feedbacks'

export default function FeedbacksPage() {
  const ct = useTranslations('Common')
  const { projectId } = useCurrentProject()
  const { data: feedbacks, isLoading, size, setSize, isReachingEnd } = useInfinite<Feedback & { user: EventUser }>(
    index => serviceGetFeedbacks({
      page: index + 1,
      projectId: projectId!,
    }),
    {
      enabled: projectId !== undefined,
      deps: [projectId],
    },
  )

  return (
    <Box >
      <Title
        rightNodes={
          (
            <Link
              href="https://ohbug.net/guide/feedbacks.html"
              target="_blank"
            >
              <Button
                leftIcon={
                  (
                    <Icon
                      as={RiQuestionLine}
                      h="5"
                      w="5"
                    />
                  )
                }
                variant="ghost"
              >
                {ct('integration')}
              </Button>
            </Link>
          )
        }
      >
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
    </Box>
  )
}

'use client'

import { useTranslations } from 'next-intl'
import { type EventUser, type Feedback } from '@prisma/client'
import FeedbacksList from '~/components/feedbacks-list'

import Title from '~/components/title'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/use-current-project'
import { useInfinite } from '~/hooks/use-infinite'
import { serviceGetFeedbacks } from '~/services/feedbacks'
import Link from 'next/link'
import { Button } from '~/components/ui/button'

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
    <div>
      <Title
        rightNodes={
          (
            <Link
              href="https://ohbug.net/guide/feedbacks.html"
              target="_blank"
            >
              <Button
                variant="outline"
              >
                <i className='i-ri-question-line mr-2'></i> {ct('integration')}
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
          className='w-full mt-6'
          disabled={isLoading || isReachingEnd}
          onClick={() => setSize(size + 1)}
          size="sm"
          variant="outline"
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
    </div>
  )
}

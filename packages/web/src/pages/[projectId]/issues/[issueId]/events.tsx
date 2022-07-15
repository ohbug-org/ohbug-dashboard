import type { GetServerSideProps, NextPage } from 'next'
import type { Issue } from 'common'
import { Button, Flex } from '@chakra-ui/react'
import type { Event } from '@prisma/client'
import EventsList from '~/components/eventsList'
import IssueDetailTitle from '~/components/issueDetailTitle'
import { serviceGetIssue } from '~/services/issues'
import ThemeBox from '~/components/themeBox'
import Wrapper from '~/components/wrapper'
import CardSection from '~/components/cardSection'
import { useInfinite } from '~/hooks/useInfinite'

interface Props {
  issue: Issue
}

export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
  const id = context.query.issueId as string
  const issue = await serviceGetIssue({ id }) as unknown as Issue
  return { props: { issue } }
}

const Detail: NextPage<Props> = ({ issue }) => {
  const { data: events, isLoading, size, setSize, isReachingEnd } = useInfinite<Event>(index => `/api/events?issueId=${issue.id}&page=${index + 1}`)

  return (
    <Flex flexDirection="column">
      <IssueDetailTitle issue={issue} />

      <ThemeBox bg="gray">
        <Wrapper>
          <CardSection title="Events">
            <EventsList events={events} />
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
          </CardSection>
        </Wrapper>
      </ThemeBox>
    </Flex>
  )
}

export default Detail

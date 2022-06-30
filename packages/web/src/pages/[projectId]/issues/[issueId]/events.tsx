import type { GetServerSideProps, NextPage } from 'next'
import type { Issue } from 'common'
import { Flex } from '@chakra-ui/react'
import EventsList from '~/components/eventsList'
import IssueDetailTitle from '~/components/issueDetailTitle'
import { serviceGetIssue } from '~/services/issues'
import ThemeBox from '~/components/themeBox'
import Wrapper from '~/components/wrapper'
import CardSection from '~/components/cardSection'

interface Props {
  issue: Issue
}

export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
  const id = context.query.issueId as string
  const issue = await serviceGetIssue({ id, withEvents: true }) as unknown as Issue
  return { props: { issue } }
}

const Detail: NextPage<Props> = ({ issue }) => {
  return (
    <Flex flexDirection="column">
      <IssueDetailTitle issue={issue} />

      <ThemeBox bg="gray">
        <Wrapper>
          <CardSection title="Events">
            <EventsList events={issue.events} />
          </CardSection>
        </Wrapper>
      </ThemeBox>
    </Flex>
  )
}

export default Detail

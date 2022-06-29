import { Box, Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/react'
import type { FC } from 'react'
import type { Issue } from 'common'
import Title from './title'
import IssueDetailTabs from './issueDetailTabs'
import { renderStringOrJson } from '~/libs/utils'

interface Props {
  issue: Issue
}

const IssueDetailTitle: FC<Props> = ({ issue }) => {
  return (
    <Title
      bg="gray"
      bottomNodes={
        <IssueDetailTabs />
      }
      rightNodes={
        (
          <StatGroup w="xs">
            <Stat>
              <StatLabel>Events</StatLabel>
              <StatNumber>{issue._count?.events}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Users</StatLabel>
              <StatNumber>{issue._count?.users}</StatNumber>
            </Stat>
          </StatGroup>
        )
      }
    >
      <Box>
        <Box
          as="a"
          noOfLines={1}
        >
          <Box
            as="span"
            fontWeight="bold"
            mr="2"
          >
            {issue.type}
          </Box>
          <code>
            {renderStringOrJson(issue.metadata.filename ?? issue.metadata.others)}
          </code>
        </Box>
        <Box
          noOfLines={[1, 2]}
          textColor="gray.400"
        >
          {
            issue.metadata.message && (
              <code>
                {renderStringOrJson(issue.metadata.message)}
              </code>
            )
          }
        </Box>
      </Box>
    </Title>
  )
}

export default IssueDetailTitle

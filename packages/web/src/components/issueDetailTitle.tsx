import { Box, Center, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import type { FC } from 'react'
import type { Issue } from 'common'
import { renderStringOrJson } from '~/libs/utils'

interface Props {
  issue: Issue
}

const IssueDetailTitle: FC<Props> = ({ issue }) => {
  return (
    <Center>
      <Box flex="1">
        <Box
          as="a"
          maxW="md"
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

      <Box>
        <Stat>
          <StatLabel>事件</StatLabel>
          <StatNumber>{issue._count?.events}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>用户</StatLabel>
          <StatNumber>{issue._count?.users}</StatNumber>
        </Stat>
      </Box>
    </Center>
  )
}

export default IssueDetailTitle

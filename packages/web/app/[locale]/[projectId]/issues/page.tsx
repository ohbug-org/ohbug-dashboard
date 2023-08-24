'use client'

import EmptyIssues from '~/components/empty-issues'
import IssueList from '~/components/issue-list'
import { Box } from '~/components/ui/box'
import Wrapper from '~/components/wrapper'

export default function IssuesPage() {
  return (
    <Box>
      <Wrapper>
        <IssueList
          empty={<EmptyIssues />}
        />
      </Wrapper>
    </Box>
  )
}

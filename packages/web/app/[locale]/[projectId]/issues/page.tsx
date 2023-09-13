'use client'

import EmptyIssues from '~/components/empty-issues'
import IssueList from '~/components/issue-list'
import Wrapper from '~/components/wrapper'

export default function IssuesPage() {
  return (
    <Wrapper>
      <IssueList
        empty={<EmptyIssues />}
      />
    </Wrapper>
  )
}

'use client'

import EmptyIssues from '~/components/emptyIssues'
import IssueList from '~/components/issueList'
import ThemeBox from '~/components/themeBox'
import Wrapper from '~/components/wrapper'

export default function IssuesPage() {
  return (
    <ThemeBox bg="current">
      <Wrapper>
        <IssueList
          empty={<EmptyIssues />}
        />
      </Wrapper>
    </ThemeBox>
  )
}

import type { NextPage } from 'next'
import EmptyIssues from '~/components/emptyIssues'
import IssueList from '~/components/issueList'
import ThemeBox from '~/components/themeBox'
import Wrapper from '~/components/wrapper'

const Issues: NextPage = () => {
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

export default Issues

import type { Issue } from '@prisma/client'
import type { FC } from 'react'

interface Props {
  data: Issue[]
}
const IssueList: FC<Props> = ({ data }) => {
  return (
    <div>{
      data.map(issue => (
        <div key={issue.id}>
          <div>
            {issue.type}
          </div>
        </div>
      ))
    }
    </div>
  )
}

export default IssueList

import type { FC } from 'react'
import type { Issue } from 'types'

function renderStringOrJson(value: any) {
  return typeof value === 'string'
    ? value
    : JSON.stringify(value)
}

interface Props {
  data: Issue[]
}
const IssueList: FC<Props> = ({ data }) => {
  return (
    <div className="border rounded ">
      {
        data.map(issue => (
          <div
            aria-label="issue item"
            className="opacity-60 py-3 px-2 hover:bg-gray-400 hover:bg-opacity-10 hover:opacity-100"
            key={issue.id}
          >
            <div className="max-w-md truncate">
              <span
                aria-label="issue metadata type"
                className="font-semibold mr-2"
              >
                {issue.type}
              </span>
              <code aria-label="issue description">
                {renderStringOrJson(issue.metadata.filename ?? issue.metadata.others)}
              </code>
            </div>
            <div
              aria-label="issue metadata message"
              className="text-gray-500 line-clamp-2"
            >
              {
                issue.metadata.message && (
                  <code aria-label="issue metadata message">
                    {renderStringOrJson(issue.metadata.message)}
                  </code>
                )
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default IssueList

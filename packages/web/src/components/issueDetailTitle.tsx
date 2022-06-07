import type { FC } from 'react'
import type { Issue } from 'types'
import { renderStringOrJson } from '~/libs/utils'

interface Props {
  issue: Issue
}

const IssueDetailTitle: FC<Props> = ({ issue }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex-1">
        <a className="max-w-md truncate">
          <span
            aria-label="issue metadata type"
            className="font-semibold mr-2"
          >
            {issue.type}
          </span>
          <code aria-label="issue description">
            {renderStringOrJson(issue.metadata.filename ?? issue.metadata.others)}
          </code>
        </a>
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

      <div className="stats">
        <div className="stat">
          <div className="stat-title">事件</div>
          <div className="stat-value">{issue._count?.events}</div>
        </div>
        <div className="stat">
          <div className="stat-title">用户</div>
          <div className="stat-value">{issue._count?.users}</div>
        </div>
      </div>
    </div>
  )
}

export default IssueDetailTitle

import type { FC } from 'react'
import { useMemo } from 'react'
import type { Issue } from 'types'
import { ClockIcon } from '@heroicons/react/outline'
import dayjs from 'dayjs'
import { groupBy } from 'ramda'
import MiniChart from './miniChart'
import type { serviceGetIssuesTrendsReturn } from '~/services/issues'

function renderStringOrJson(value: any) {
  return typeof value === 'string'
    ? value
    : JSON.stringify(value)
}

interface Props {
  issues: Issue[]
  trends?: serviceGetIssuesTrendsReturn
}
const IssueList: FC<Props> = ({ issues, trends }) => {
  // const buckets = Array.from(
  //   // @ts-expect-error
  //   new Array(dayjs(max).diff(dayjs(min), interval) + 1)).map((_, index) => {
  //   const timestamp = dayjs(min)
  //     // @ts-expect-error
  //     .add(index, interval)
  //     .format(trend?.format?.replace(/\d+/, ''))
  //   const match = result.find((v: { timestamp: string | number; count: string | number }) =>
  //     v.timestamp === timestamp)
  //   if (match) {
  //     return {
  //       timestamp,
  //       count: parseInt(match.count, 10),
  //     }
  //   }
  //   return {
  //     timestamp,
  //     count: trend?.min_doc_count,
  //   }
  // })
  const groupedTrends = useMemo(() => groupBy(issue => issue.issueId, trends ?? []), [trends])

  return (
    <div className="border rounded">
      {
        issues.map(issue => (
          <div
            aria-label="issue item"
            className="opacity-60 py-3 px-2 flex hover:bg-gray-400 hover:bg-opacity-10 hover:opacity-100"
            key={issue.id}
          >
            {/* main */}
            <div className="w-1/2">
              <div className="max-w-md truncate">
                {/* title */}
                <span
                  aria-label="issue metadata type"
                  className="font-semibold mr-2"
                >
                  {issue.type}
                </span>
                {/* second description */}
                <code aria-label="issue description">
                  {renderStringOrJson(issue.metadata.filename ?? issue.metadata.others)}
                </code>
              </div>
              {/* message */}
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
              {/* other message (time/appType/...) */}
              <div>
                {/* appType */}
                {/* time */}
                <div className="flex items-center text-xs">
                  <ClockIcon className="w-3 h-3"/>
                  <span
                    className="tooltip"
                    data-tip={`最后出现时间 ${dayjs(issue.updatedAt).format()}`}
                  >
                    {dayjs(issue.updatedAt).fromNow()}
                  </span>
                  <span className="mx-1">|</span>
                  <span
                    className="tooltip"
                    data-tip={`首次出现时间 ${dayjs(issue.createdAt).format()}`}
                  >
                    {dayjs(issue.createdAt).fromNow()}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-48">
              <MiniChart
                data={groupedTrends[issue.id]}
                type="24h"
              />
            </div>

            <div className="w-20 flex items-center justify-center">
              {issue._count?.events}
            </div>

            <div className="w-20 flex items-center justify-center">
              {issue._count?.users}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default IssueList

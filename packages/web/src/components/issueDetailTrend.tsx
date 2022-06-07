import dayjs from 'dayjs'
import type { FC } from 'react'
import type { Issue } from 'types'
import MiniChart from './miniChart'
import type { Trend } from '~/services/issues'

interface Props {
  issue: Issue
  trends: {
    '14d': Trend[]
    '24h': Trend[]
  }
}

const IssueDetailTrend: FC<Props> = ({ issue, trends }) => {
  return (
    <div>
      <div className="!mb-4">
        {trends['14d'] && (
          <MiniChart
            data={trends['14d']}
            title="过去14天"
            type="14d"
          />
        )}
      </div>
      <div className="!mb-4">
        {trends['24h'] && (
          <MiniChart
            data={trends['24h']}
            title="过去24小时"
            type="24h"
          />
        )}
      </div>

      <div className="!mb-4">
        <h5>首次发生</h5>
        <div>
          <div className="text-secondary">
            {dayjs(issue?.createdAt).fromNow()}
          </div>
        </div>
        <div>
          <div className="text-secondary">
            {dayjs(issue?.createdAt).format('YYYY-MM-DD HH:mm:ss A')}
          </div>
        </div>
      </div>
      <div className="!mb-4">
        <h5>最近发生</h5>
        <div>
          <div className="text-secondary">
            {dayjs(issue?.updatedAt).fromNow()}
          </div>
        </div>
        <div>
          <div className="text-secondary">
            {dayjs(issue?.updatedAt).format('YYYY-MM-DD HH:mm:ss A')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IssueDetailTrend

import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import type { Issue, OhbugEventLike } from 'types'
import { renderStringOrJson } from '~/libs/utils'
import { serviceGetEvent } from '~/services/events'
import { serviceGetIssue } from '~/services/issues'

interface Props {
  issue: Issue
  event: OhbugEventLike
}

export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
  const issue = await serviceGetIssue({ id: context.query.id as string }) as unknown as Issue
  const event = await serviceGetEvent({ issueId: context.query.id as string }) as unknown as OhbugEventLike
  return { props: { issue, event } }
}

const Detail: NextPage<Props> = ({ issue, event }) => {
  return (
    <div>
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

      <div>
        <h4>
          事件 {' '}
          <Link
            as={`/api/events/${event.id}`}
            href={{
              href: 'api/events/[id]',
              query: { id: event.id },
            }}
          >
            <a target="_blank">{event.id}</a>
          </Link>
        </h4>
      </div>
    </div>
  )
}

export default Detail

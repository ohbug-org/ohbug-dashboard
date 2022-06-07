import dayjs from 'dayjs'
import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import type { Issue, OhbugEventLike } from 'types'
import StackInfo from '~/components/stackInfo'
import { getMessageAndIconByActionType, renderStringOrJson } from '~/libs/utils'
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

      <div>
        {/* all */}
        {event.detail.message && (
          <div className="!mb-4">
            {renderStringOrJson(event.detail.message)}
          </div>
        )}
        {/* unhandledrejectionError */}
        {/* uncaughtError */}
        {event.detail.stack && (
          <div className="!mb-4">
            <StackInfo
              source={event?.source}
              stack={event.detail.stack}
            />
          </div>
        )}
        {/* resourceError */}
        {event?.detail.selector && (
          <div className="!mb-4">
            {renderStringOrJson(event.detail)}
          </div>
        )}
        {/* ajaxError */}
        {/* fetchError */}
        {event?.type === 'ajaxError' && (
          <div className="!mb-4">
            {renderStringOrJson(event.detail)}
          </div>
        )}
        {/* websocketError */}
        {event?.type === 'websocketError' && (
          <div className="!mb-4">
            {renderStringOrJson(event.detail)}
          </div>
        )}
      </div>

      {/* actions */}
      <div>
        <ul className="steps steps-vertical max-h-96 overflow-y-auto">
          {event?.actions?.map((action) => {
            const { message, icon } = getMessageAndIconByActionType(action)
            return (
              <li
                className="step step-neutral"
                data-content={icon}
                key={action.timestamp + action.data}
              >
                <div className="w-full flex justify-between items-center">
                  <div className="font-bold w-24">
                    {action.type}
                  </div>
                  <div className="flex-1 text-secondary text-left">{message}</div>
                  <div
                    className="tooltip"
                    data-tip={dayjs(event.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                  >
                    <div className="w-20 text-secondary">
                      {dayjs(event.timestamp).format('HH:mm:ss')}
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
          <li
            className="step step-neutral step-error"
            data-content="🐛"
          >
            <div className="w-full flex justify-between items-center">
              <div className="font-bold w-24">
                exception
              </div>
              <div className="flex-1 text-secondary text-left">
                {renderStringOrJson(event.detail.message)}
              </div>
              <div
                className="tooltip"
                data-tip={dayjs(event.timestamp).format('YYYY-MM-DD HH:mm:ss')}
              >
                <div className="w-20 text-secondary">
                  {dayjs(event.timestamp).format('HH:mm:ss')}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Detail

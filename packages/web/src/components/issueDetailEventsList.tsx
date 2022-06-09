import dayjs from 'dayjs'
import Link from 'next/link'
import type { FC } from 'react'
import type { OhbugEventLike } from 'types'
import { renderStringOrJson } from '~/libs/utils'

interface Props {
  events?: OhbugEventLike[]
}

const issueDetailEventsList: FC<Props> = ({ events }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th>description</th>
            <th>appType</th>
            <th>appVersion</th>
            <th>category</th>
            <th>releaseStage</th>
            <th>user</th>
            <th>sdk</th>
            <th>device</th>
            <th>metadata</th>
          </tr>
        </thead>
        <tbody>
          {
            events?.map(event => (
              <tr key={event.id}>
                {/* description */}
                <td>
                  <Link href={`/issues/${event.issueId}/?eventId=${event.id}`}>
                    <a>{dayjs(event.createdAt).format('YYYY-MM-DD HH:mm:ss')}</a>
                  </Link>
                  <div>{event.type}: {renderStringOrJson(event.detail.message ?? event.detail)}</div>
                </td>
                {/* appType */}
                <td>{event.appType}</td>
                {/* appVersion */}
                <td>{event.appVersion}</td>
                {/* category */}
                <td>{event.category}</td>
                {/* releaseStage */}
                <td>{event.releaseStage}</td>
                {/* user */}
                <td>{renderStringOrJson(event.user)}</td>
                {/* sdk */}
                <td>{renderStringOrJson(event.sdk)}</td>
                {/* device */}
                <td>{renderStringOrJson(event.device)}</td>
                {/* metadata */}
                <td>{renderStringOrJson(event.metadata)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default issueDetailEventsList

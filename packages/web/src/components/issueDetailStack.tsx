import type { FC } from 'react'
import type { OhbugEventLike } from 'types'
import StackInfo from './stackInfo'
import { renderStringOrJson } from '~/libs/utils'

interface Props {
  event: OhbugEventLike
}

const IssueDetailStack: FC<Props> = ({ event }) => {
  return (
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
  )
}

export default IssueDetailStack

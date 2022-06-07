import dayjs from 'dayjs'
import type { FC } from 'react'
import type { OhbugEventLike } from 'types'
import { getMessageAndIconByActionType, renderStringOrJson } from '~/libs/utils'

interface Props {
  event: OhbugEventLike
}

const IssueDetailActions: FC<Props> = ({ event }) => {
  return (
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
  )
}

export default IssueDetailActions

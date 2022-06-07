import type { ReactNode } from 'react'
import type { OhbugAction } from '@ohbug/types'

export function renderStringOrJson(value: any) {
  return typeof value === 'string'
    ? value
    : JSON.stringify(value)
}

export function getMessageAndIconByActionType(action: OhbugAction): {
  message: ReactNode
  icon: ReactNode
} {
  switch (action.type) {
    case 'click':
      if (action.data?.selector) {
        return {
          message: action.data?.selector,
          icon: '🖱️',
        }
      }
      return {
        message: (
          <div>
            <span>{action.message}</span>{' '}
            <span className="text-secondary">{renderStringOrJson(action.data)}</span>
          </div>
        ),
        icon: '🖱️',
      }
    case 'navigation':
      return {
        message: (
          <>
            <strong>From:</strong> <em>{action.data?.from}</em>{' '}
            <strong>To:</strong> <em>{action.data?.to}</em>
          </>
        ),
        icon: '🧭',
      }
    case 'ajax':
      return {
        message: (
          <>
            <strong>{action.data?.req?.method}</strong>{' '}
            <em>{action.data?.req?.url}</em>{' '}
            <strong>[{action.data?.res?.status}]</strong>
          </>
        ),
        icon: '🚀',
      }
    case 'fetch':
      return {
        message: (
          <>
            <strong>{action.data?.req?.method}</strong>{' '}
            <em>{action.data?.req?.url}</em>{' '}
            <strong>[{action.data?.res?.status}]</strong>
          </>
        ),
        icon: '🚀',
      }
    case 'console':
      return {
        message: `[${action.message}] ${JSON.stringify(action.data)}`,
        icon: '⌨️',
      }
    default:
      return {
        message: (
          <div>
            <span>{action.message}</span>{' '}
            <span className="text-secondary">{renderStringOrJson(action.data)}</span>
          </div>
        ),
        icon: null,
      }
  }
}

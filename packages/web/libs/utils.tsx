import UA from 'ua-parser-js'
import { type OhbugAction, type OhbugEvent } from '@ohbug/types'
import { type ReactNode } from 'react'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function renderStringOrJson(value?: any) {
  return typeof value === 'string'
    ? value
    : JSON.stringify(value)
}

export function getDeviceInfo(event?: OhbugEvent<any>) {
  if (event) {
    const { device: eventDevice, sdk } = event
    if (eventDevice && sdk.platform === 'ohbug-browser') {
      const { url, title, version, language, platform, userAgent } = eventDevice

      if (userAgent) {
        const parser = new UA()
        parser.setUA(userAgent)
        const result = parser.getResult()
        const { browser, device, engine, os } = result
        return {
          url,
          title,
          version,
          language,
          platform,
          browser,
          engine,
          os,
          device,
          sdk,
        }
      }
    }

    if (eventDevice && sdk.platform === 'ohbug-miniapp') {
      const { app, version, platform, device, system, SDKVersion } = event.device
      return {
        app,
        version,
        platform,
        device,
        system,
        SDKVersion,
        sdk,
      }
    }
  }

  return null
}

export function getMessageAndIconByActionType(action: OhbugAction): {
  message: ReactNode
  icon: any
  color: string
} {
  switch (action.type) {
    case 'click':
      if (action.data?.selector) {
        return {
          message: action.data?.selector,
          icon: <i className="i-ri-cursor-fill"></i>,
          color: 'gray',
        }
      }
      return {
        message: (
          <>
            <span>{action.message}</span>{' '}
            <span className='text-stone-500'>{renderStringOrJson(action.data)}</span>
          </>
        ),
        icon: <i className="i-ri-cursor-fill"></i>,
        color: 'gray',
      }
    case 'navigation':
      return {
        message: (
          <>
            <strong>From:</strong> <em>{action.data?.from}</em>{' '}
            <strong>To:</strong> <em>{action.data?.to}</em>
          </>
        ),
        icon: <i className="i-ri-router-fill"></i>,
        color: 'gray',
      }
    case 'ajax':
      return {
        message: (
          <>
            <strong>{action.data?.req?.method}</strong>{' '}
            <em>{action.data?.req?.url}</em>{' '}
          </>
        ),
        icon: <i className="i-ri-loader-2-fill"></i>,
        color: 'gray',
      }
    case 'fetch':
      return {
        message: (
          <>
            <strong>{action.data?.req?.method}</strong>{' '}
            <em>{action.data?.req?.url}</em>{' '}
          </>
        ),
        icon: <i className="i-ri-loader-2-fill"></i>,
        color: 'gray',
      }
    case 'console':
      return {
        message: `[${action.message}] ${JSON.stringify(action.data)}`,
        icon: <i className="i-ri-terminal-box-fill"></i>,
        color: 'gray',
      }
    case 'exception':
      return {
        message: renderStringOrJson(action.message),
        icon: <i className="i-ri-bug-fill"></i>,
        color: 'red',
      }
    default:
      return {
        message: (
          <>
            <span>{action.message}</span>{' '}
            <span className='text-stone-500'>{renderStringOrJson(action.data)}</span>
          </>
        ),
        icon: <i className="i-ri-gift-2-fill"></i>,
        color: 'gray',
      }
  }
}

export function scrollWindowTo(to?: number) {
  document.scrollingElement?.scrollTo({ top: to ?? 0, behavior: 'smooth' })
}

export function average(arr: number[]) {
  return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

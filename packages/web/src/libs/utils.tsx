import type { ReactNode } from 'react'
import type { OhbugAction, OhbugEvent } from '@ohbug/types'
import UA from 'ua-parser-js'
import { Text } from '@chakra-ui/react'
import { RiBugFill, RiCursorFill, RiGift2Fill, RiLoader2Fill, RiRouterFill, RiTerminalBoxFill } from 'react-icons/ri'
import type { IconType } from 'react-icons'

export function renderStringOrJson(value: any) {
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
  icon: IconType
} {
  switch (action.type) {
    case 'click':
      if (action.data?.selector) {
        return {
          message: action.data?.selector,
          icon: RiCursorFill,
        }
      }
      return {
        message: (
          <>
            <span>{action.message}</span>{' '}
            <Text color="gray.500">{renderStringOrJson(action.data)}</Text>
          </>
        ),
        icon: RiCursorFill,
      }
    case 'navigation':
      return {
        message: (
          <>
            <strong>From:</strong> <em>{action.data?.from}</em>{' '}
            <strong>To:</strong> <em>{action.data?.to}</em>
          </>
        ),
        icon: RiRouterFill,
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
        icon: RiLoader2Fill,
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
        icon: RiLoader2Fill,
      }
    case 'console':
      return {
        message: `[${action.message}] ${JSON.stringify(action.data)}`,
        icon: RiTerminalBoxFill,
      }
    case 'exception':
      return {
        message: renderStringOrJson(action.message),
        icon: RiBugFill,
      }
    default:
      return {
        message: (
          <>
            <span>{action.message}</span>{' '}
            <Text color="gray.500">{renderStringOrJson(action.data)}</Text>
          </>
        ),
        icon: RiGift2Fill,
      }
  }
}

export function scrollWindowTo(to?: number) {
  document.scrollingElement?.scrollTo({ top: to ?? 0, behavior: 'smooth' })
}

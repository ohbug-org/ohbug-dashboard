'use client'

import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { type OhbugEventLike } from 'common'
import Link from 'next/link'
import Wrapper from './wrapper'
import { Separator } from './ui/separator'
import { getDeviceInfo } from '~/libs/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'

interface Props {
  event: OhbugEventLike | any
}

export default function EventDetailProfile({ event }: Props) {
  const t = useTranslations('Event')
  const deviceInfo = useMemo(() => getDeviceInfo(event), [event])
  const tagList = useMemo(() => {
    const result = []
    if (event?.createdAt) {
      result.push({
        key: 'time',
        title: `${t('profileTimestamp')}: ${dayjs(event.createdAt).format('YYYY-MM-DD HH:mm:ss')}`,
        value: dayjs(event.createdAt).fromNow(),
        icon: <i className="i-ri-time-line" />,
      })
    }
    if (event?.user?.uuid) {
      result.push({
        key: 'uuid',
        title: `UUID: ${event?.user?.uuid}`,
        value: event?.user?.uuid,
        icon: <i className="i-ri-fingerprint-line" />,
      })
    }
    if (event?.user?.ipAddress) {
      result.push({
        key: 'ip',
        title: `IP: ${event?.user?.ipAddress}`,
        value: event?.user?.ipAddress,
        icon: <i className="i-ri-links-line" />,
      })
    }
    if (event?.device?.title) {
      result.push({
        key: 'title',
        title: `${t('profileTitle')}: ${event.device.title}`,
        value: event.device.title,
        icon: <i className="i-ri-heading" />,
      })
    }
    if (event?.device?.url) {
      result.push({
        key: 'url',
        title: `URL: ${event.device.url}`,
        value: event.device.url,
        icon: <i className="i-ri-linkedin-line" />,
      })
    }
    if (event?.device?.language) {
      result.push({
        key: 'language',
        title: `${t('profileLanguage')}: ${event.device.language}`,
        value: event.device.language,
        icon: <i className="i-ri-earth-line" />,
      })
    }
    if (event?.appVersion) {
      result.push({
        key: 'appVersion',
        title: `AppVersion: ${event.appVersion}`,
        value: event.appVersion,
        icon: <i className="i-ri-cake-line" />,
      })
    }
    if (event?.appType) {
      result.push({
        key: 'appType',
        title: `AppType: ${event.appType}`,
        value: event.appType,
        icon: <i className="i-ri-cake-2-line" />,
      })
    }
    if (event?.releaseStage) {
      result.push({
        key: 'releaseStage',
        title: `ReleaseStage: ${event.releaseStage}`,
        value: event.releaseStage,
        icon: <i className="i-ri-cake-3-line" />,
      })
    }
    if (
      event?.device?.device?.screenWidth
      && event?.device?.device?.screenHeight
      && event?.device?.device?.pixelRatio
    ) {
      result.push({
        key: 'dpi',
        title: `${t('profileDPI')}: ${event?.device?.device?.screenWidth} × ${event?.device?.device?.screenHeight} @ ${event?.device?.device?.pixelRatio}x`,
        value: `${event?.device?.device?.screenWidth} × ${event?.device?.device?.screenHeight} @ ${event?.device?.device?.pixelRatio}x`,
        icon: <i className="i-ri-computer-line" />,
      })
    }

    return result
  }, [event])

  return (
    <Wrapper>
      <Card>
        <CardHeader>
          <CardTitle>Event Environment</CardTitle>
          <CardDescription>
            {
              event.category === 'error'
                ? (
                  <Link
                    href={`/api/events/${event.id}`}
                  >
                    JSON Raw {event.id}
                  </Link>
                  )
                : null
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {/* 浏览器 */}
            {
              deviceInfo?.browser
                ? (
                  <>
                    <div className="flex flex-col">
                      <div>{deviceInfo?.browser?.name ?? ''}</div>
                      <div>{deviceInfo?.browser?.version ?? ''}</div>
                    </div>
                    <Separator
                      className="h-12"
                      orientation="vertical"
                    />
                  </>
                  )
                : null
            }
            {/* 系统 */}
            {
              deviceInfo?.os
                ? (
                  <>
                    <div className="flex flex-col">
                      <div>{deviceInfo?.os?.name ?? ''}</div>
                      <div>{deviceInfo?.os?.version ?? ''}</div>
                    </div>
                    <Separator
                      className="h-12"
                      orientation="vertical"
                    />
                  </>
                  )
                : null
              }
            {/* App */}
            {
              deviceInfo?.app
                ? (
                  <>
                    <div className="flex flex-col">
                      <div>{deviceInfo?.app ?? ''}</div>
                      <div>{`${deviceInfo?.version} / ${deviceInfo?.SDKVersion}`}</div>
                    </div>
                    <Separator
                      className="h-12"
                      orientation="vertical"
                    />
                  </>
                  )
                : null
            }
            {/* 品牌 */}
            {
              (deviceInfo?.device && deviceInfo?.device?.brand)
                ? (
                  <>
                    <div>
                      <div>{deviceInfo?.device?.brand ?? ''}</div>
                      <div>{deviceInfo?.device?.model ?? ''}</div>
                    </div>
                    <Separator
                      className="h-12"
                      orientation="vertical"
                    />
                  </>
                  )
                : null
            }
            {/* 平台 */}
            {
              deviceInfo?.platform
                ? (
                  <>
                    <div className="flex flex-col">
                      <div>{deviceInfo?.platform ?? ''}</div>
                      <div>{deviceInfo?.system ?? ''}</div>
                    </div>
                    <Separator
                      className="h-12"
                      orientation="vertical"
                    />
                  </>
                  )
                : null
            }
            {/* SDK */}
            {
              deviceInfo?.sdk
                ? (
                  <div className="flex flex-col">
                    <div>{deviceInfo?.sdk.platform ?? ''}</div>
                    <div>{deviceInfo?.sdk.version ?? ''}</div>
                  </div>
                  )
                : null
            }
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {
              tagList.map(tag => (
                <Tooltip key={tag.key}>
                  <TooltipTrigger>
                    <Badge className="space-x-2">
                      {tag.icon}
                      {tag.value}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{tag.title}</span>
                  </TooltipContent>
                </Tooltip>
              ))
            }
          </div>
        </CardContent>
      </Card>
    </Wrapper>
  )
}

'use client'

import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'
import { type OhbugEventLike } from 'common'
import Wrapper from './wrapper'
import AccordionSection from './card-section'
import { getDeviceInfo } from '~/libs/utils'
import Link from 'next/link'
import { Badge } from '~/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'

interface Props {
  event: OhbugEventLike | any
}

const EventDetailProfile: FC<Props> = ({ event }) => {
  const t = useTranslations('Event')
  const deviceInfo = useMemo(() => getDeviceInfo(event), [event])
  const tagList = useMemo(() => {
    const result = []
    if (event?.createdAt) {
      result.push({
        key: 'time',
        title: `${t('profileTimestamp')}: ${dayjs(event.createdAt).format('YYYY-MM-DD HH:mm:ss')}`,
        value: dayjs(event.createdAt).fromNow(),
        icon: <i className='i-ri-time-line'></i>,
      })
    }
    if (event?.user?.uuid) {
      result.push({
        key: 'uuid',
        title: `UUID: ${event?.user?.uuid}`,
        value: event?.user?.uuid,
        icon: <i className='i-ri-fingerprint-line'></i>,
      })
    }
    if (event?.user?.ipAddress) {
      result.push({
        key: 'ip',
        title: `IP: ${event?.user?.ipAddress}`,
        value: event?.user?.ipAddress,
        icon: <i className='i-ri-links-line'></i>,
      })
    }
    if (event?.device?.title) {
      result.push({
        key: 'title',
        title: `${t('profileTitle')}: ${event.device.title}`,
        value: event.device.title,
        icon: <i className='i-ri-heading'></i>,
      })
    }
    if (event?.device?.url) {
      result.push({
        key: 'url',
        title: `URL: ${event.device.url}`,
        value: event.device.url,
        icon: <i className='i-ri-linkedin-line'></i>,
      })
    }
    if (event?.device?.language) {
      result.push({
        key: 'language',
        title: `${t('profileLanguage')}: ${event.device.language}`,
        value: event.device.language,
        icon: <i className='i-ri-earth-line'></i>,
      })
    }
    if (event?.appVersion) {
      result.push({
        key: 'appVersion',
        title: `AppVersion: ${event.appVersion}`,
        value: event.appVersion,
        icon: <i className='i-ri-cake-line'></i>,
      })
    }
    if (event?.appType) {
      result.push({
        key: 'appType',
        title: `AppType: ${event.appType}`,
        value: event.appType,
        icon: <i className='i-ri-cake-2-line'></i>,
      })
    }
    if (event?.releaseStage) {
      result.push({
        key: 'releaseStage',
        title: `ReleaseStage: ${event.releaseStage}`,
        value: event.releaseStage,
        icon: <i className='i-ri-cake-3-line'></i>,
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
        icon: <i className='i-ri-computer-line'></i>,
      })
    }

    return result
  }, [event])

  return (
    <div>
      <Wrapper>
        <AccordionSection
          head={
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
          title="Event Environment"
        >
          <div className='flex flex-wrap mt-6'>
            {/* 浏览器 */}
            {
              deviceInfo?.browser && (
                <div className='flex flex-col'>
                  <div>{deviceInfo?.browser?.name ?? ''}</div>
                  <div>{deviceInfo?.browser?.version ?? ''}</div>
                </div>
              )
            }
            {/* 系统 */}
            {
              deviceInfo?.os && (
                <div className='flex flex-col'>
                  <div>{deviceInfo?.os?.name ?? ''}</div>
                  <div>{deviceInfo?.os?.version ?? ''}</div>
                </div>
              )
            }
            {/* App */}
            {
              deviceInfo?.app && (
                <div className='flex flex-col'>
                  <div>{deviceInfo?.app ?? ''}</div>
                  <div>{`${deviceInfo?.version} / ${deviceInfo?.SDKVersion}`}</div>
                </div>
              )
            }
            {/* 品牌 */}
            {
              (deviceInfo?.device && deviceInfo?.device?.brand) && (
                <div>
                  <div>{deviceInfo?.device?.brand ?? ''}</div>
                  <div>{deviceInfo?.device?.model ?? ''}</div>
                </div>
              )
            }
            {/* 平台 */}
            {
              deviceInfo?.platform && (
                <div className='flex flex-col'>
                  <div>{deviceInfo?.platform ?? ''}</div>
                  <div>{deviceInfo?.system ?? ''}</div>
                </div>
              )
            }
            {/* SDK */}
            {
              deviceInfo?.sdk && (
                <div className='flex flex-col'>
                  <div>{deviceInfo?.sdk.platform ?? ''}</div>
                  <div>{deviceInfo?.sdk.version ?? ''}</div>
                </div>
              )
            }
          </div>

          <div className="flex flex-wrap mt-6">
            {
              tagList.map(tag => (
                <Tooltip key={tag.key}>
                  <TooltipTrigger>
                    <Badge className='space-x-2'>
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
        </AccordionSection>
      </Wrapper>
    </div>
  )
}

export default EventDetailProfile

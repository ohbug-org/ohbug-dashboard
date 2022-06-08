import dayjs from 'dayjs'
import type { FC } from 'react'
import { useMemo } from 'react'
import type { OhbugEventLike } from 'types'
import { AcademicCapIcon, ClockIcon, CubeIcon, DesktopComputerIcon, FingerPrintIcon, IdentificationIcon, LinkIcon, PresentationChartBarIcon, PuzzleIcon, TranslateIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { getDeviceInfo } from '~/libs/utils'

interface Props {
  event: OhbugEventLike
}

const IssueDetailProfile: FC<Props> = ({ event }) => {
  const deviceInfo = useMemo(() => getDeviceInfo(event), [event])
  const tagList = useMemo(() => {
    const result = []
    if (event?.timestamp) {
      result.push({
        key: 'time',
        title: `发生时间: ${dayjs(event.timestamp).format('YYYY-MM-DD HH:mm:ss')}`,
        value: dayjs(event.timestamp).fromNow(),
        icon: <ClockIcon className="w-4" />,
      })
    }
    if (event?.user?.uuid) {
      result.push({
        key: 'uuid',
        title: `UUID: ${event?.user?.uuid}`,
        value: event?.user?.uuid,
        icon: <IdentificationIcon className="w-4" />,
      })
    }
    if (event?.user?.ipAddress) {
      result.push({
        key: 'ip',
        title: `IP: ${event?.user?.ipAddress}`,
        value: event?.user?.ipAddress,
        icon: <FingerPrintIcon className="w-4" />,
      })
    }
    if (event?.device?.title) {
      result.push({
        key: 'title',
        title: `标题: ${event.device.title}`,
        value: event.device.title,
        icon: <PresentationChartBarIcon className="w-4" />,
      })
    }
    if (event?.device?.url) {
      result.push({
        key: 'url',
        title: `URL: ${event.device.url}`,
        value: event.device.url,
        icon: <LinkIcon className="w-4" />,
      })
    }
    if (event?.device?.language) {
      result.push({
        key: 'language',
        title: `Language: ${event.device.language}`,
        value: event.device.language,
        icon: <TranslateIcon className="w-4" />,
      })
    }
    if (event?.appVersion) {
      result.push({
        key: 'appVersion',
        title: `AppVersion: ${event.appVersion}`,
        value: event.appVersion,
        icon: <AcademicCapIcon className="w-4" />,
      })
    }
    if (event?.appType) {
      result.push({
        key: 'appType',
        title: `AppType: ${event.appType}`,
        value: event.appType,
        icon: <PuzzleIcon className="w-4" />,
      })
    }
    if (event?.releaseStage) {
      result.push({
        key: 'releaseStage',
        title: `ReleaseStage: ${event.releaseStage}`,
        value: event.releaseStage,
        icon: <CubeIcon className="w-4" />,
      })
    }
    if (
      event?.device?.device?.screenWidth
      && event?.device?.device?.screenHeight
      && event?.device?.device?.pixelRatio
    ) {
      result.push({
        key: 'dpi',
        title: `分辨率: ${event?.device?.device?.screenWidth} × ${event?.device?.device?.screenHeight} @ ${event?.device?.device?.pixelRatio}x`,
        value: `${event?.device?.device?.screenWidth} × ${event?.device?.device?.screenHeight} @ ${event?.device?.device?.pixelRatio}x`,
        icon: <DesktopComputerIcon className="w-4" />,
      })
    }

    return result
  }, [event])

  return (
    <>
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
        <div className="stats shadow">
          {/* 浏览器 */}
          {deviceInfo?.browser && (
            <div className="stat">
              <div className="stat-title">{deviceInfo?.browser?.name ?? ''}</div>
              <div className="stat-desc">{deviceInfo?.browser?.version ?? ''}</div>
            </div>
          )}
          {/* 系统 */}
          {deviceInfo?.os && (
            <div className="stat">
              <div className="stat-title">{deviceInfo?.os?.name ?? ''}</div>
              <div className="stat-desc">{deviceInfo?.os?.version ?? ''}</div>
            </div>
          )}
          {/* App */}
          {deviceInfo?.app && (
            <div className="stat">
              <div className="stat-title">{deviceInfo?.app ?? ''}</div>
              <div className="stat-desc">{`${deviceInfo?.version} / ${deviceInfo?.SDKVersion}`}</div>
            </div>
          )}
          {/* 品牌 */}
          {(deviceInfo?.device && deviceInfo?.device?.brand) && (
            <div className="stat">
              <div className="stat-title">{deviceInfo?.device?.brand ?? ''}</div>
              <div className="stat-desc">{deviceInfo?.device?.model ?? ''}</div>
            </div>
          )}
          {/* 平台 */}
          {deviceInfo?.platform && (
            <div className="stat">
              <div className="stat-title">{deviceInfo?.platform ?? ''}</div>
              <div className="stat-desc">{deviceInfo?.system ?? ''}</div>
            </div>
          )}
          {/* SDK */}
          {deviceInfo?.sdk && (
            <div className="stat">
              <div className="stat-title">{deviceInfo?.sdk.platform ?? ''}</div>
              <div className="stat-desc">{deviceInfo?.sdk.version ?? ''}</div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {
          tagList.map(tag => (
            <div
              className="tooltip"
              data-tip={tag.title}
              key={tag.key}
            >
              <span className="badge badge-outline gap-2">
                {tag.icon}
                {tag.value}
              </span>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default IssueDetailProfile

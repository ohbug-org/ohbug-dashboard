import { AcademicCapIcon, ClockIcon, CubeIcon, DesktopComputerIcon, FingerPrintIcon, IdentificationIcon, LinkIcon, PresentationChartBarIcon, PuzzleIcon, TranslateIcon } from '@heroicons/react/outline'
import dayjs from 'dayjs'
import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useMemo } from 'react'
import type { Issue, OhbugEventLike } from 'types'
import StackInfo from '~/components/stackInfo'
import { getDeviceInfo, getMessageAndIconByActionType, renderStringOrJson } from '~/libs/utils'
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
    if (event?.user?.ip) {
      result.push({
        key: 'ip',
        title: `IP: ${event?.user?.ip}`,
        value: event?.user?.ip,
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

import dayjs from 'dayjs'
import type { FC } from 'react'
import { useMemo } from 'react'
import type { OhbugEventLike } from 'common'
import { RiCake2Line, RiCake3Line, RiCakeLine, RiComputerLine, RiEarthLine, RiFingerprintLine, RiHeading, RiLinkedinLine, RiLinksLine, RiTimeLine } from 'react-icons/ri'
import NextLink from 'next/link'
import { Box, Icon, Link, Stat, StatHelpText, StatLabel, Tag, Tooltip, Wrap, WrapItem } from '@chakra-ui/react'
import Card from './card'
import ThemeBox from './themeBox'
import Wrapper from './wrapper'
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
        icon: RiTimeLine,
      })
    }
    if (event?.user?.uuid) {
      result.push({
        key: 'uuid',
        title: `UUID: ${event?.user?.uuid}`,
        value: event?.user?.uuid,
        icon: RiFingerprintLine,
      })
    }
    if (event?.user?.ipAddress) {
      result.push({
        key: 'ip',
        title: `IP: ${event?.user?.ipAddress}`,
        value: event?.user?.ipAddress,
        icon: RiLinksLine,
      })
    }
    if (event?.device?.title) {
      result.push({
        key: 'title',
        title: `标题: ${event.device.title}`,
        value: event.device.title,
        icon: RiHeading,
      })
    }
    if (event?.device?.url) {
      result.push({
        key: 'url',
        title: `URL: ${event.device.url}`,
        value: event.device.url,
        icon: RiLinkedinLine,
      })
    }
    if (event?.device?.language) {
      result.push({
        key: 'language',
        title: `Language: ${event.device.language}`,
        value: event.device.language,
        icon: RiEarthLine,
      })
    }
    if (event?.appVersion) {
      result.push({
        key: 'appVersion',
        title: `AppVersion: ${event.appVersion}`,
        value: event.appVersion,
        icon: RiCakeLine,
      })
    }
    if (event?.appType) {
      result.push({
        key: 'appType',
        title: `AppType: ${event.appType}`,
        value: event.appType,
        icon: RiCake2Line,
      })
    }
    if (event?.releaseStage) {
      result.push({
        key: 'releaseStage',
        title: `ReleaseStage: ${event.releaseStage}`,
        value: event.releaseStage,
        icon: RiCake3Line,
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
        icon: RiComputerLine,
      })
    }

    return result
  }, [event])

  return (
    <ThemeBox bg="current">
      <Wrapper>
        <Box>
          事件 {' '}
          <NextLink
            as={`/api/events/${event.id}`}
            href={
              {
                href: 'api/events/[id]',
                query: { id: event.id },
              }
            }
          >
            <Link isExternal>{event.id}</Link>
          </NextLink>
        </Box>

        <Card>
          {/* 浏览器 */}
          {
            deviceInfo?.browser && (
              <Stat>
                <StatLabel>{deviceInfo?.browser?.name ?? ''}</StatLabel>
                <StatHelpText>{deviceInfo?.browser?.version ?? ''}</StatHelpText>
              </Stat>
            )
          }
          {/* 系统 */}
          {
            deviceInfo?.os && (
              <Stat>
                <StatLabel>{deviceInfo?.os?.name ?? ''}</StatLabel>
                <StatHelpText>{deviceInfo?.os?.version ?? ''}</StatHelpText>
              </Stat>
            )
          }
          {/* App */}
          {
            deviceInfo?.app && (
              <Stat>
                <StatLabel>{deviceInfo?.app ?? ''}</StatLabel>
                <StatHelpText>{`${deviceInfo?.version} / ${deviceInfo?.SDKVersion}`}</StatHelpText>
              </Stat>
            )
          }
          {/* 品牌 */}
          {
            (deviceInfo?.device && deviceInfo?.device?.brand) && (
              <Stat>
                <StatLabel>{deviceInfo?.device?.brand ?? ''}</StatLabel>
                <StatHelpText>{deviceInfo?.device?.model ?? ''}</StatHelpText>
              </Stat>
            )
          }
          {/* 平台 */}
          {
            deviceInfo?.platform && (
              <Stat>
                <StatLabel>{deviceInfo?.platform ?? ''}</StatLabel>
                <StatHelpText>{deviceInfo?.system ?? ''}</StatHelpText>
              </Stat>
            )
          }
          {/* SDK */}
          {
            deviceInfo?.sdk && (
              <Stat>
                <StatLabel>{deviceInfo?.sdk.platform ?? ''}</StatLabel>
                <StatHelpText>{deviceInfo?.sdk.version ?? ''}</StatHelpText>
              </Stat>
            )
          }
        </Card>

        <Wrap>
          {
            tagList.map(tag => (
              <Tooltip
                key={tag.key}
                label={tag.title}
              >
                <WrapItem>
                  <Tag
                    borderRadius="full"
                    gap="2"
                    size="lg"
                  >
                    <Icon
                      as={tag.icon}
                      h="5"
                      w="5"
                    />
                    {tag.value}
                  </Tag>
                </WrapItem>
              </Tooltip>
            ))
          }
        </Wrap>
      </Wrapper>
    </ThemeBox>
  )
}

export default IssueDetailProfile

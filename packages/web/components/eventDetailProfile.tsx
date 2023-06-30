'use client'

import dayjs from 'dayjs'
import type { FC } from 'react'
import { useMemo } from 'react'
import type { OhbugEventLike } from 'common'
import { RiCake2Line, RiCake3Line, RiCakeLine, RiComputerLine, RiEarthLine, RiFingerprintLine, RiHeading, RiLinkedinLine, RiLinksLine, RiTimeLine } from 'react-icons/ri'
import { Icon, Link, Stat, StatGroup, StatHelpText, StatLabel, Tag, Tooltip, Wrap, WrapItem } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import ThemeBox from './themeBox'
import Wrapper from './wrapper'
import CardSection from './cardSection'
import { getDeviceInfo } from '~/libs/utils'

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
        title: `${t('profileTitle')}: ${event.device.title}`,
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
        title: `${t('profileLanguage')}: ${event.device.language}`,
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
        title: `${t('profileDPI')}: ${event?.device?.device?.screenWidth} × ${event?.device?.device?.screenHeight} @ ${event?.device?.device?.pixelRatio}x`,
        value: `${event?.device?.device?.screenWidth} × ${event?.device?.device?.screenHeight} @ ${event?.device?.device?.pixelRatio}x`,
        icon: RiComputerLine,
      })
    }

    return result
  }, [event])

  return (
    <ThemeBox bg="gray">
      <Wrapper>
        <CardSection
          head={
            event.category === 'error'
              ? (
                <Link
                  href={`/api/events/${event.id}`}
                  isExternal
                >
                JSON Raw {event.id}
                </Link>
              )
              : null
          }
          title="Event Environment"
        >
          <StatGroup mt="6">
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
          </StatGroup>

          <Wrap mt="6">
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
        </CardSection>
      </Wrapper>
    </ThemeBox>
  )
}

export default EventDetailProfile

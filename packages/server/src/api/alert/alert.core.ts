import { Alert, AlertLevel, Event, Issue } from '@prisma/client'
import { AlertConditionTopic, AlertFilterTopic, ConditionOption, FilterOption, Interval } from 'common'
import dayjs from 'dayjs'
import markdownIt from 'markdown-it'
import { GetAlertStatusParams } from '../report/report.interface'
import { PrismaService } from '~/common'

function getIntervalMs(interval: Interval) {
  switch ((interval)) {
    case '1m': {
      const intervalMs = 60 * 1000
      return intervalMs
    }
    case '5m': {
      const intervalMs = 5 * 60 * 1000
      return intervalMs
    }
    case '15m': {
      const intervalMs = 15 * 60 * 1000
      return intervalMs
    }
    case '1h': {
      const intervalMs = 60 * 60 * 1000
      return intervalMs
    }
    case '1d': {
      const intervalMs = 24 * 60 * 60 * 1000
      return intervalMs
    }
    case '7d': {
      const intervalMs = 7 * 24 * 60 * 60 * 1000
      return intervalMs
    }
    case '30d': {
      const intervalMs = 30 * 24 * 60 * 60 * 1000
      return intervalMs
    }
    default:
      return 0
  }
}

/**
 * 判断是否在静默期内 在 return true 否则 return false
 */
function judgingInterval(alert: Alert) {
  if (alert.recentlyAt) {
    // 判断当前时间是否大于静默期
    const now = dayjs()
    const last = dayjs(alert.recentlyAt)
    const interval = getIntervalMs(alert.interval as Interval)
    if (now.isBefore(last.add(interval, 'ms'))) {
      return true
    }
  }
  return false
}

async function getEventIntervalCount(
  event: Event,
  interval: Interval,
  value: number,
  alert: Alert,
  prisma: PrismaService,
) {
  const count = await prisma.event.count({
    where: {
      apiKey: event.apiKey,
      createdAt: { gte: dayjs().subtract(getIntervalMs(interval), 'ms').toDate() },
    },
  })
  if (count >= value) {
    return {
      topic: AlertConditionTopic.EventFrequencyCondition,
      condition: true,
      metadata: {
        count,
        value,
        interval,
      },
      alert,
    }
  }
  return {
    topic: AlertConditionTopic.EventFrequencyCondition,
    condition: false,
  }
}
async function getUserIntervalCount(
  issue: Issue,
  interval: Interval,
  value: number,
  alert: Alert,
  prisma: PrismaService,
) {
  const count = await prisma.eventUser.count({
    where: {
      createdAt: { gte: dayjs().subtract(getIntervalMs(interval), 'ms').toDate() },
      AND: { issues: { every: { issueId: issue.id } } },
    },
  })
  if (count >= value) {
    return {
      topic: AlertConditionTopic.UserFrequencyCondition,
      condition: true,
      metadata: {
        count,
        value,
        interval,
      },
      alert,
    }
  }
  return {
    topic: AlertConditionTopic.UserFrequencyCondition,
    condition: false,
  }
}

async function judgingCondition(event: Event, issue: Issue, alert: Alert, prisma: PrismaService) {
  const conditions = alert.conditions as unknown as ConditionOption[]
  const result = []
  for (const condition of conditions) {
    switch (condition.topic) {
      case AlertConditionTopic.EventCapturedCondition: {
        result.push({
          topic: AlertConditionTopic.EventCapturedCondition,
          condition: true,
          alert,
        })
        break
      }
      case AlertConditionTopic.FirstSeenEventCondition: {
        if (dayjs(issue.createdAt).isSame(dayjs(event.createdAt))) {
          result.push({
            topic: AlertConditionTopic.FirstSeenEventCondition,
            condition: true,
            alert,
          })
          break
        }
        result.push({
          topic: AlertConditionTopic.FirstSeenEventCondition,
          condition: false,
        })
        break
      }
      case AlertConditionTopic.EventFrequencyCondition: {
        const { value, interval } = condition
        result.push(await getEventIntervalCount(event, interval as Interval, parseInt(value as string), alert, prisma))
        break
      }
      case AlertConditionTopic.UserFrequencyCondition: {
        const { value, interval } = condition
        result.push(await getUserIntervalCount(issue, interval as Interval, parseInt(value as string), alert, prisma))
        break
      }
    }
  }
  return result
}

async function judgingFilter(
  event: Event,
  issue: Issue,
  issueEventsCount: number,
  alert: Alert,
  prisma: PrismaService,
) {
  const filters = alert.filters as unknown as FilterOption[]
  for (const filter of filters) {
    switch (filter.topic) {
      case AlertFilterTopic.IssueOccurrencesFilter: {
        const { value } = filter
        if (issueEventsCount >= value!) {
          return true
        }
        break
      }
      case AlertFilterTopic.EventAttributeFilter: {
        const { attribute, match, value } = filter
        const attr = event[attribute as keyof Event] as string
        const v = value?.toString() ?? ''
        if (attr) {
          switch (match) {
            case 'contains': {
              if (attr.includes(v)) {
                return true
              }
              break
            }
            case 'starts with': {
              if (attr.startsWith(v)) {
                return true
              }
              break
            }
            case 'ends with': {
              if (attr.endsWith(v)) {
                return true
              }
              break
            }
            case 'equals': {
              if (attr === value) {
                return true
              }
              break
            }
            case 'does not contain': {
              if (!attr.includes(v)) {
                return true
              }
              break
            }
            case 'does not start with': {
              if (!attr.startsWith(v)) {
                return true
              }
              break
            }
            case 'does not end with': {
              if (!attr.endsWith(v)) {
                return true
              }
              break
            }
            case 'does not equal': {
              if (attr !== value) {
                return true
              }
              break
            }
          }
        }
        break
      }
      case AlertFilterTopic.LatestReleaseFilter: {
        const latestIssue = await prisma.issue.findFirstOrThrow({
          where: { apiKey: issue.apiKey },
          orderBy: { createdAt: 'desc' },
        })
        if (latestIssue.id === issue.id) {
          return true
        }
        break
      }
    }
  }
  return true
}

export async function getAlertStatus(
  event: Event,
  issue: Issue,
  issueEventsCount: number,
  alerts: Alert[],
  prisma: PrismaService,
) {
  let result: {
    topic: AlertConditionTopic
    condition: boolean
    metadata?: any
    alert?: Alert
  }[] = []
  for (const alert of alerts) {
    const alertNew = await prisma.alert.findUniqueOrThrow({ where: { id: alert.id } })
    if (!alertNew.enabled) continue
    if (judgingInterval(alertNew)) continue
    const filtered = await judgingFilter(event, issue, issueEventsCount, alertNew, prisma)
    if (!filtered) continue

    const item = await judgingCondition(event, issue, alertNew, prisma)
    result = result.concat(item.filter(v => v.condition))
  }
  return result
}

function switchLevelAndGetText(level: AlertLevel) {
  const levelList = [
    { label: '严重', value: 'serious' },
    { label: '警告', value: 'warning' },
    { label: '默认', value: 'default' },
  ]
  return levelList.find(item => item.value === level)?.label
}
const md = markdownIt()
export function getAlertContent(
  event: Event,
  issue: GetAlertStatusParams['issue'],
  issueEventsCount: number,
  issueUsersCount: number,
  alert: Alert,
) {
  const url = (event.device as any).url
  const { type, updatedAt } = issue
  const metadata = JSON.parse(issue.metadata || '{}')
  const message = metadata.message || 'unknown message'
  const filename = metadata.filename
  const others = metadata.others
  const title = `「Ohbug」[问题通知] [${switchLevelAndGetText(alert.level)}] ${type}`
  const statistics = {
    eventsCount: issueEventsCount,
    usersCount: issueUsersCount,
    time: updatedAt,
  }

  const text = `
  ${title}

  Message
  ${message}

  Statistics
  总事件数：${statistics.eventsCount}
  总用户数：${statistics.usersCount}
  时间：${dayjs(statistics.time).format('YYYY-MM-DD HH:mm:ss')}

  ${
  (!!url && url !== 'undefined')
    ? `Url
  ${url}`
    : ''
}

  ${
  (!!filename && filename !== 'undefined')
    ? `File
  ${filename}`
    : ''
}

  ${
  (!!others && others !== 'undefined')
    ? `Others
  ${others}`
    : ''
}
  `
  const markdown = `
  # ${title}

  ## Message
  - ${message}

  ## Statistics
  - 总事件数：${statistics.eventsCount}
  - 总用户数：${statistics.usersCount}
  - 时间：${dayjs(statistics.time).format('YYYY-MM-DD HH:mm:ss')}

  ${
  (!!url && url !== 'undefined')
    ? `Url
  ${url}`
    : ''
}

    ${
  (!!filename && filename !== 'undefined')
    ? `File
  ${filename}`
    : ''
}

    ${
  (!!others && others !== 'undefined')
    ? `Others
  ${others}`
    : ''
}
  `
  const html = md.render(markdown)
  const lite = `总事件数：${statistics.eventsCount} 总用户数：${
    statistics.usersCount
  } 时间：${dayjs(statistics.time).format('YYYY-MM-DD HH:mm:ss')}`
  return {
    title,
    text,
    lite,
    markdown,
    html,
  }
}

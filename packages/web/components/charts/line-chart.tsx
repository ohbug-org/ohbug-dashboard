'use client'

import { memo, useCallback } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  XAxis,
} from 'recharts'
import dayjs from 'dayjs'
import { useTheme } from 'next-themes'
import Loading from '../loading'
import { colors } from '~/styles/colors'

interface Props {
  data?: object[]
  nameKey: string
  valueKey: string
  name?: string
  tooltipType?: 'a' | 'b'
}

const LineChart = memo<Props>(({ data, nameKey, valueKey, name = 'Events', tooltipType = 'a' }) => {
  if (!data) return <Loading />

  const { resolvedTheme } = useTheme()
  const CustomTooltip = useCallback(
    ({ active, payload, label }: TooltipProps<string, string>) => {
      if (active && payload && payload.length > 0) {
        return (
          <div className="text-left bg-white dark:bg-stone-900 text-stone-900 dark:text-white rounded shadow-lg p-2">
            <span>
              {label}
              {
                tooltipType === 'b' && (
                  <>
                    <br />
                    {dayjs(name).format('h:00 A → h:59 A')}
                  </>
                )
              }
            </span>
            <br />
            <b>{payload[0].value} {name}</b>
          </div>
        )
      }

      return null
    },
    [name, tooltipType],
  )

  return (
    <ResponsiveContainer
      height="100%"
      width="100%"
    >
      <AreaChart data={data}>
        <XAxis
          dataKey={nameKey}
          height={0}
        />
        <Tooltip content={CustomTooltip} />
        <Area
          dataKey={valueKey}
          fill={resolvedTheme === 'light' ? colors.green[50] : colors.green[300]}
          stroke={resolvedTheme === 'light' ? colors.green[500] : colors.green[700]}
          strokeWidth={4}
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
})

LineChart.displayName = 'LineChart'

export default LineChart

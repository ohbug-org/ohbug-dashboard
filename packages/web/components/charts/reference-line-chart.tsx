'use client'

import { memo, useCallback } from 'react'
import {
  Area,
  AreaChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'
import { useTheme } from 'next-themes'
import Loading from '../loading'
import { colors } from '~/styles/colors'

interface Props {
  data?: object[]
  nameKey: string
  valueKey: string
  name?: string
  plotValue: number[]
  unit?: string
}

const ReferenceLineChart = memo<Props>(({ data, nameKey, valueKey, name = 'Events', plotValue, unit = 'ms' }) => {
  if (!data) return <Loading />

  const { resolvedTheme } = useTheme()
  const CustomTooltip = useCallback(
    ({ active, payload, label }: TooltipProps<string, string>) => {
      if (active && payload && payload.length > 0) {
        return (
          <div className="text-left bg-white dark:bg-stone-900 text-stone-900 dark:text-white rounded shadow-lg p-2">
            <span>{label}</span>
            <br />
            <b>{payload[0].value} {unit}</b>
          </div>
        )
      }

      return null
    },
    [name],
  )

  return (
    <ResponsiveContainer
      height="100%"
      width="100%"
    >
      <AreaChart data={data}>
        <XAxis
          dataKey={nameKey}
        />
        <YAxis
          dataKey={valueKey}
          domain={[0, (plotValue?.[1] ?? 0) * 2]}
        />
        <Tooltip content={CustomTooltip} />
        <Area
          dataKey={valueKey}
          fill={resolvedTheme === 'light' ? colors.green[50] : colors.green[300]}
          stroke={resolvedTheme === 'light' ? colors.green[500] : colors.green[700]}
          strokeWidth={4}
          type="monotone"
        />
        <ReferenceArea
          fill={resolvedTheme === 'light' ? colors.green[50] : colors.green[200]}
          label="GOOD"
          y1={0}
          y2={plotValue?.[0] ?? 0}
        />
        <ReferenceArea
          fill={resolvedTheme === 'light' ? colors.yellow[50] : colors.yellow[300]}
          label="NEED IMPROVEMENT"
          y1={plotValue?.[0] ?? 0}
          y2={plotValue?.[1] ?? 0}
        />
        <ReferenceArea
          fill={resolvedTheme === 'light' ? colors.red[50] : colors.red[300]}
          label="POOR"
          y1={plotValue?.[1] ?? 0}
          y2={(plotValue?.[1] ?? 0) * 2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
})

ReferenceLineChart.displayName = 'ReferenceLineChart'

export default ReferenceLineChart

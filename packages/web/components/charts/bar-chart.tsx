'use client'

import { memo, useCallback } from 'react'
import {
  Bar,
  BarChart,
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
}

const BarChartComponent = memo<Props>(({ data, nameKey, valueKey, name = 'Events' }) => {
  if (!data) return <Loading />

  const { resolvedTheme } = useTheme()
  const CustomTooltip = useCallback(
    ({ active, payload, label }: TooltipProps<string, string>) => {
      if (active && payload && payload.length > 0) {
        return (
          <div className="text-left bg-white dark:bg-stone-900 text-stone-900 dark:text-white rounded shadow-lg p-2">
            <span>{label}</span>
            <br />
            <b>{payload[0].value} {name}</b>
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
      <BarChart
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <XAxis
          axisLine={false}
          dataKey={nameKey}
          height={20}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          dataKey={valueKey}
          tickLine={false}
          width={28}
        />
        <Tooltip content={CustomTooltip} />
        <Bar
          dataKey={valueKey}
          fill={resolvedTheme === 'light' ? colors.green[500] : colors.green[700]}
          minPointSize={1}
        />
      </BarChart>
    </ResponsiveContainer>
  )
})

BarChartComponent.displayName = 'BarChart'

export default BarChartComponent

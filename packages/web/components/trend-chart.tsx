'use client'

import { memo, useEffect, useMemo, useRef } from 'react'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import dayjs from 'dayjs'
import { useTheme } from 'next-themes'
import { type Options } from 'highcharts'
import { type ReactNode } from 'react'
import Loading from './loading'
import { theme as chartTheme } from '~/styles/chart.theme'
import { colors } from '~/styles/colors'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

interface MiniChartProps {
  type: '24h' | '14d'
  data?: any[]
  title?: ReactNode
  variant?: 'mini' | 'detail' | 'line' | 'row'
  name?: string
  timeField?: string
  valueField?: string
  unit?: string
  plotValue?: number[]
}

const TrendChart = memo<MiniChartProps>(({ type, data, title, variant = 'mini', name = 'Events', timeField = 'time', valueField = 'count', unit = 'events', plotValue }) => {
  if (!data) return <Loading />

  const ref = useRef<any>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (typeof Highcharts === 'object') {
      Highcharts.setOptions(chartTheme)
    }
  }, [])
  useEffect(() => {
    ref.current.chart.showLoading()
    if (data) {
      ref.current.chart.hideLoading()
    }
  }, [data])

  const options = useMemo<Options>(
    () => {
      if (variant === 'detail') {
        return {
          accessibility: { enabled: false },
          colors: [theme === 'dark' ? 'white' : 'black'],
          chart: { type: 'column' },
          xAxis: { categories: data?.map(v => v[timeField]), crosshair: true },
          yAxis: {
            min: 0,
            labels: { enabled: true },
            gridLineWidth: 1,
          },
          series: [
            {
              name,
              type: 'column',
              data: data?.map(v => v[valueField]),
            },
          ],
          exporting: { enabled: false },
        }
      }
      if (variant === 'row') {
        return {
          accessibility: { enabled: false },
          colors: [theme === 'dark' ? 'white' : 'black'],
          chart: { type: 'bar' },
          xAxis: { categories: data?.map(v => v[timeField]), crosshair: true },
          yAxis: {
            min: 0,
            labels: { enabled: true },
            gridLineWidth: 1,
          },
          series: [
            {
              name,
              type: 'column',
              data: data?.map(v => v[valueField]),
            },
          ],
          exporting: { enabled: false },
        }
      }
      if (variant === 'line') {
        return {
          chart: { spacingTop: 15 },
          accessibility: { enabled: false },
          colors: [theme === 'dark' ? 'white' : 'black'],
          xAxis: { categories: data?.map(v => v[timeField]) },
          yAxis: {
            labels: { enabled: true },
            max: (plotValue?.[1] ?? 0) * 2,
            // minRange: plotValue?.[0] ?? 0,
            plotLines: plotValue?.map(v => ({
              color: colors.black[500],
              dashStyle: 'Dash',
              width: 1,
              value: v,
            })),
            plotBands: [
              {
                from: 0,
                to: plotValue?.[0] ?? 0,
                color: colors.green[50],
                label: {
                  text: 'GOOD',
                  style: { color: colors.green[500] },
                },
              },
              {
                from: plotValue?.[0] ?? 0,
                to: plotValue?.[1] ?? 0,
                color: colors.yellow[50],
                label: {
                  text: 'NEED IMPROVEMENT',
                  style: { color: colors.yellow[500] },
                },
              },
              {
                from: plotValue?.[1] ?? 0,
                to: (plotValue?.[1] ?? 0) * 2,
                color: colors.red[50],
                label: {
                  text: 'POOR',
                  style: { color: colors.red[500] },
                },
              },
            ],
          },
          series: [
            {
              name,
              type: 'areaspline',
              data: data?.map(v => ({
                name: v[timeField],
                y: v[valueField],
              })),
              lineWidth: 2,
              marker: { enabled: false },
            },
          ],
          exporting: { enabled: false },
        }
      }
      return {
        accessibility: { enabled: false },
        colors: [theme === 'dark' ? 'white' : 'black'],
        chart: {
          height: 60,
          spacingTop: 5,
          spacingBottom: 5,
        },
        xAxis: { labels: { enabled: false } },
        series: [
          {
            type: 'areaspline',
            data: data?.map(v => ({
              name: v[timeField],
              y: v[valueField],
            })),
            lineWidth: 2,
            marker: { enabled: false },
            tooltip: {
              headerFormat: '',
              pointFormatter() {
                const { name, y } = this
                if (type === '24h') {
                  return `<div style="text-align: center"><span>${dayjs(name).format('YYYY-MM-DD')}<br />${dayjs(name).format('h:00 A → h:59 A')}</span><br /><b>${y} ${unit}</b></div>`
                }

                if (type === '14d') {
                  return `<div style="text-align: center"><span>${dayjs(name).format('YYYY-MM-DD')}</span><br /><b>${y} ${unit}</b></div>`
                }

                return ''
              },
            },
          },
        ],
        exporting: { enabled: false },
      }
    },
    [data, type, variant, theme, name, timeField, valueField, unit],
  )

  return (
    <div>
      {title}
      <HighchartsReact
        ref={ref}
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
})

TrendChart.displayName = 'TrendChart'

export default TrendChart

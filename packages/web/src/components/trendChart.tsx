import type { FC, ReactNode } from 'react'
import { memo, useEffect, useMemo, useRef } from 'react'
import type { Options } from 'highcharts'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import dayjs from 'dayjs'
import { Box } from '@chakra-ui/react'
import { theme } from '~/styles/chart.theme'
import type { IssueTrend } from '~/services/issues'
import type { ProjectTrend } from '~/services/projects'

if (typeof Highcharts === 'object')
  HighchartsExporting(Highcharts)

interface MiniChartProps {
  type: '24h' | '14d'
  data?: IssueTrend[] | ProjectTrend[]
  title?: ReactNode
  variant?: 'mini' | 'detail'
}

const TrendChart: FC<MiniChartProps> = memo(({ type, data, title, variant = 'mini' }) => {
  const ref = useRef<any>(null)

  useEffect(() => {
    if (typeof Highcharts === 'object')
      Highcharts.setOptions(theme)
  }, [])
  useEffect(() => {
    ref.current.chart.showLoading()
    if (data)
      ref.current.chart.hideLoading()
  }, [data])

  const options = useMemo<Options>(
    () => {
      if (variant === 'detail') {
        return {
          chart: { type: 'column' },
          xAxis: { categories: data?.map(v => v.time), crosshair: true },
          yAxis: {
            min: 0,
            title: { text: 'Events Count' },
          },
          series: [
            {
              name: 'Events',
              type: 'column',
              data: data?.map(v => v.count),
            },
          ],
          exporting: { enabled: false },
        }
      }
      return {
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
              name: v.time,
              y: v.count,
            })),
            lineWidth: 4,
            marker: { enabled: false },
            tooltip: {
              headerFormat: '',
              pointFormatter() {
                const { name, y } = this
                if (type === '24h')
                  return `<div style="text-align: center"><span>${dayjs(name).format('YYYY-MM-DD')}<br />${dayjs(name).format('h:00 A → h:59 A')}</span><br /><b>${y} events</b></div>`

                if (type === '14d')
                  return `<div style="text-align: center"><span>${dayjs(name).format('YYYY-MM-DD')}</span><br /><b>${y} events</b></div>`

                return ''
              },
            },
          },
        ],
        exporting: { enabled: false },
      }
    },
    [data, type, variant],
  )

  return (
    <Box>
      {title}
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={ref}
      />
    </Box>
  )
})

TrendChart.displayName = 'TrendChart'

export default TrendChart

import type { FC } from 'react'
import { memo, useMemo } from 'react'
import type { Options } from 'highcharts'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import dayjs from 'dayjs'
import { useMount } from 'react-use'
import { theme } from '~/styles/chart.theme'
import type { Trend } from '~/services/issues'

if (typeof Highcharts === 'object')
  HighchartsExporting(Highcharts)

interface MiniChartProps {
  type: '24h' | '14d'
  data?: Trend[]
  title?: string
}

const MiniChart: FC<MiniChartProps> = memo(({ type, data, title }) => {
  useMount(() => {
    if (typeof Highcharts === 'object')
      Highcharts.setOptions(theme)
  })

  const options = useMemo<Options>(
    () => ({
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
    }),
    [data, type],
  )

  return (
    <div>
      {title && (
        <div className="font-semibold">
          <i />
          {title}
        </div>
      )}
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
})

MiniChart.displayName = 'MiniChart'

export default MiniChart

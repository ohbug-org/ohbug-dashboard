'use client'

import { useTranslations } from 'next-intl'
import IntroduceChart from '~/components/introduce-chart'
import Title from '~/components/title'
import TrendChart from '~/components/trend-chart'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/use-current-project'
import { average } from '~/libs/utils'
import { serviceGetMetricsTrends } from '~/services/metrics'
import { useQuery } from '~/hooks/use-query'
import Link from 'next/link'
import { Button } from '~/components/ui/button'

const CLS_THRESHOLD = [0.1, 0.25]
const FID_THRESHOLD = [100, 300]
const LCP_THRESHOLD = [2500, 4000]
const FCP_THRESHOLD = [1800, 3000]
const INP_THRESHOLD = [200, 500]
const TTFB_THRESHOLD = [800, 1800]

export default function MetricsPage() {
  const ct = useTranslations('Common')
  const t = useTranslations('Metrics')
  const { projectId } = useCurrentProject()
  const { data: CLSData } = useQuery(
    () => serviceGetMetricsTrends({
      projectId: projectId!,
      type: '14d',
      metric: 'CLS',
    }),
    { enabled: projectId !== undefined },
  )
  const { data: FIDData } = useQuery(
    () => serviceGetMetricsTrends({
      projectId: projectId!,
      type: '14d',
      metric: 'FID',
    }),
    { enabled: projectId !== undefined },
  )
  const { data: LCPData } = useQuery(
    () => serviceGetMetricsTrends({
      projectId: projectId!,
      type: '14d',
      metric: 'LCP',
    }),
    { enabled: projectId !== undefined },
  )
  const { data: INPData } = useQuery(
    () => serviceGetMetricsTrends({
      projectId: projectId!,
      type: '14d',
      metric: 'INP',
    }),
    { enabled: projectId !== undefined },
  )
  const { data: FCPData } = useQuery(
    () => serviceGetMetricsTrends({
      projectId: projectId!,
      type: '14d',
      metric: 'FCP',
    }),
    { enabled: projectId !== undefined },
  )
  const { data: TTFBData } = useQuery(
    () => serviceGetMetricsTrends({
      projectId: projectId!,
      type: '14d',
      metric: 'TTFB',
    }),
    { enabled: projectId !== undefined },
  )

  return (
    <div>
      <Title
        rightNodes={
          (
            <Link
              href="https://ohbug.net/guide/metrics.html"
              target="_blank"
            >
              <Button variant="outline">
                <i className='i-ri-question-line'></i> {ct('integration')}
              </Button>
            </Link>
          )
        }
      >
        Metrics
      </Title>

      <Wrapper className='flex flex-col gap-24'>
        <IntroduceChart
          description={t('CLSDescription')}
          title="Cumulative Layout Shift (CLS)"
          unit="ms"
          value={average(CLSData?.map(v => v.value) ?? [])}
        >
          <TrendChart
            data={CLSData}
            name="CLS"
            plotValue={CLS_THRESHOLD}
            timeField="time"
            type="14d"
            unit="ms"
            valueField="value"
            variant="line"
          />
        </IntroduceChart>

        <IntroduceChart
          description={t('FIDDescription')}
          title="First Input Delay (FID)"
          unit="ms"
          value={average(FIDData?.map(v => v.value) ?? [])}
        >
          <TrendChart
            data={FIDData}
            name="FID"
            plotValue={FID_THRESHOLD}
            timeField="time"
            type="14d"
            unit="ms"
            valueField="value"
            variant="line"
          />
        </IntroduceChart>

        <IntroduceChart
          description={t('LCPDescription')}
          title="Largest Contentful Paint (LCP)"
          unit="ms"
          value={average(LCPData?.map(v => v.value) ?? [])}
        >
          <TrendChart
            data={LCPData}
            name="LCP"
            plotValue={LCP_THRESHOLD}
            timeField="time"
            type="14d"
            unit="ms"
            valueField="value"
            variant="line"
          />
        </IntroduceChart>

        <IntroduceChart
          description={t('INPDescription')}
          title="Interaction to Next Paint (INP)"
          unit="ms"
          value={average(INPData?.map(v => v.value) ?? [])}
        >
          <TrendChart
            data={INPData}
            name="INP"
            plotValue={INP_THRESHOLD}
            timeField="time"
            type="14d"
            unit="ms"
            valueField="value"
            variant="line"
          />
        </IntroduceChart>

        <IntroduceChart
          description={t('FCPDescription')}
          title="First Contentful Paint (FCP)"
          unit="ms"
          value={average(FCPData?.map(v => v.value) ?? [])}
        >
          <TrendChart
            data={FCPData}
            name="FCP"
            plotValue={FCP_THRESHOLD}
            timeField="time"
            type="14d"
            unit="ms"
            valueField="value"
            variant="line"
          />
        </IntroduceChart>

        <IntroduceChart
          description={t('TTFBDescription')}
          title="Time to First Byte (TTFB)"
          unit="ms"
          value={average(TTFBData?.map(v => v.value) ?? [])}
        >
          <TrendChart
            data={TTFBData}
            name="TTFB"
            plotValue={TTFB_THRESHOLD}
            timeField="time"
            type="14d"
            unit="ms"
            valueField="value"
            variant="line"
          />
        </IntroduceChart>
      </Wrapper>
    </div>
  )
}

'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { CLSThresholds, FCPThresholds, FIDThresholds, INPThresholds, LCPThresholds, TTFBThresholds } from 'web-vitals'
import IntroduceChart from '~/components/introduce-chart'
import Title from '~/components/title'
import ReferenceLineChart from '~/components/charts/reference-line-chart'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/use-current-project'
import { average } from '~/libs/utils'
import { serviceGetMetricsTrends } from '~/services/metrics'
import { useQuery } from '~/hooks/use-query'
import { Button } from '~/components/ui/button'

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
                <i className="i-ri-question-line" /> {ct('integration')}
              </Button>
            </Link>
        )
        }
      >
        Metrics
      </Title>

      <Wrapper className="flex flex-col gap-24">
        <IntroduceChart
          description={t('CLSDescription')}
          title="Cumulative Layout Shift (CLS)"
          unit="ms"
          value={average(CLSData?.map(v => v.value) ?? [])}
        >
          <ReferenceLineChart
            data={CLSData}
            name="CLS"
            nameKey="time"
            plotValue={CLSThresholds}
            unit="ms"
            valueKey="value"
          />
        </IntroduceChart>

        <IntroduceChart
          description={t('FIDDescription')}
          title="First Input Delay (FID)"
          unit="ms"
          value={average(FIDData?.map(v => v.value) ?? [])}
        >
          <ReferenceLineChart
            data={FIDData}
            name="FID"
            nameKey="time"
            plotValue={FIDThresholds}
            unit="ms"
            valueKey="value"
          />
        </IntroduceChart>

        <IntroduceChart
          description={t('LCPDescription')}
          title="Largest Contentful Paint (LCP)"
          unit="ms"
          value={average(LCPData?.map(v => v.value) ?? [])}
        >
          <ReferenceLineChart
            data={LCPData}
            name="LCP"
            nameKey="time"
            plotValue={LCPThresholds}
            unit="ms"
            valueKey="value"
          />
        </IntroduceChart>

        <IntroduceChart
          description={t('INPDescription')}
          title="Interaction to Next Paint (INP)"
          unit="ms"
          value={average(INPData?.map(v => v.value) ?? [])}
        >
          <ReferenceLineChart
            data={INPData}
            name="INP"
            nameKey="time"
            plotValue={INPThresholds}
            unit="ms"
            valueKey="value"
          />
        </IntroduceChart>

        <IntroduceChart
          description={t('FCPDescription')}
          title="First Contentful Paint (FCP)"
          unit="ms"
          value={average(FCPData?.map(v => v.value) ?? [])}
        >
          <ReferenceLineChart
            data={FCPData}
            name="FCP"
            nameKey="time"
            plotValue={FCPThresholds}
            unit="ms"
            valueKey="value"
          />
        </IntroduceChart>

        <IntroduceChart
          description={t('TTFBDescription')}
          title="Time to First Byte (TTFB)"
          unit="ms"
          value={average(TTFBData?.map(v => v.value) ?? [])}
        >
          <ReferenceLineChart
            data={TTFBData}
            name="TTFB"
            nameKey="time"
            plotValue={TTFBThresholds}
            unit="ms"
            valueKey="value"
          />
        </IntroduceChart>
      </Wrapper>
    </div>
  )
}

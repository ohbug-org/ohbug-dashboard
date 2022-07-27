import { Button, Icon, Link } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useTranslations } from 'next-intl'
import useSWR from 'swr'
import { RiQuestionLine } from 'react-icons/ri'
import IntroduceChart from '~/components/introduceChart'
import ThemeBox from '~/components/themeBox'
import Title from '~/components/title'
import TrendChart from '~/components/trendChart'
import Wrapper from '~/components/wrapper'
import useCurrentProject from '~/hooks/useCurrentProject'
import { average } from '~/libs/utils'
import type { MetricsTrend } from '~/services/metrics'

const CLS_THRESHOLD = [0.1, 0.25]
const FID_THRESHOLD = [100, 300]
const LCP_THRESHOLD = [2500, 4000]
const FCP_THRESHOLD = [1800, 3000]
const TTFB_THRESHOLD = [800, 1800]

const Metrics: NextPage = () => {
  const ct = useTranslations('Common')
  const t = useTranslations('Metrics')
  const { projectId } = useCurrentProject()
  const { data: CLSData } = useSWR<MetricsTrend[]>(projectId ? `/api/trends/metrics?projectId=${projectId}&type=${'24h'}&metric=CLS` : null)
  const { data: FIDData } = useSWR<MetricsTrend[]>(projectId ? `/api/trends/metrics?projectId=${projectId}&type=${'24h'}&metric=FID` : null)
  const { data: LCPData } = useSWR<MetricsTrend[]>(projectId ? `/api/trends/metrics?projectId=${projectId}&type=${'24h'}&metric=LCP` : null)
  const { data: FCPData } = useSWR<MetricsTrend[]>(projectId ? `/api/trends/metrics?projectId=${projectId}&type=${'24h'}&metric=FCP` : null)
  const { data: TTFBData } = useSWR<MetricsTrend[]>(projectId ? `/api/trends/metrics?projectId=${projectId}&type=${'24h'}&metric=TTFB` : null)

  return (
    <ThemeBox bg="current">
      <Title
        rightNodes={
          (
            <Link
              href="https://ohbug.net/guide/metrics.html"
              target="_blank"
            >
              <Button
                leftIcon={
                  (
                    <Icon
                      as={RiQuestionLine}
                      h="5"
                      w="5"
                    />
                  )
                }
                variant="ghost"
              >
                {ct('integration')}
              </Button>
            </Link>
          )
        }
      >
        Metrics
      </Title>

      <Wrapper
        display="flex"
        flexDirection="column"
        gap="24"
      >
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
            type="24h"
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
            type="24h"
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
            type="24h"
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
            type="24h"
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
            type="24h"
            unit="ms"
            valueField="value"
            variant="line"
          />
        </IntroduceChart>
      </Wrapper>
    </ThemeBox>
  )
}

export default Metrics

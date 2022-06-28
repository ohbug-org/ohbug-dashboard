import { Box, Button, Flex, FormControl, FormLabel, Heading, Switch, Text } from '@chakra-ui/react'
import type { Project } from '@prisma/client'
import type { GetServerSideProps, NextPage } from 'next'
import { useMemo, useState } from 'react'
import Card from '~/components/card'
import ThemeBox from '~/components/themeBox'
import TrendChart from '~/components/trendChart'
import Wrapper from '~/components/wrapper'
import type { ProjectTrend } from '~/services/projects'
import { serviceGetProject, serviceGetProjectTrends } from '~/services/projects'

interface Props {
  project: Project
  trends: {
    '14d': ProjectTrend[]
    '24h': ProjectTrend[]
  }
}

export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
  const projectId = parseInt(context.query.id as string)
  const project = await serviceGetProject(projectId)
  const trends14d = await serviceGetProjectTrends({ id: projectId, type: '14d' })
  const trends24h = await serviceGetProjectTrends({ id: projectId, type: '24h' })
  return {
    props: {
      project,
      trends: {
        '14d': trends14d,
        '24h': trends24h,
      },
    },
  }
}

const Detail: NextPage<Props> = ({ project, trends }) => {
  const [chartType, setChartType] = useState<'24h' | '14d'>('24h')
  const TrendTitle = useMemo(() => (
    <Flex justify="space-between">
      <Text fontWeight="bold">Project Trends</Text>
      <FormControl
        alignItems="center"
        display="flex"
        w="auto"
      >
        <FormLabel
          htmlFor="trendsType"
          mb="0"
        >
          {chartType === '24h' ? '24小时' : '14天'}
        </FormLabel>
        <Switch
          id="trendsType"
          isChecked={chartType === '24h'}
          onChange={e => setChartType(e.target.checked ? '24h' : '14d')}
        />
      </FormControl>
    </Flex>
  ), [chartType])

  return (
    <Box>
      <ThemeBox
        bg="current"
        borderBottom="1px"
        borderColor="current"
      >
        <Wrapper
          display="flex"
          justifyContent="space-between"
          py="16"
        >
          <Heading>{project.name}</Heading>
          <Box>
            <Button variant="solid">Setting</Button>
          </Box>
        </Wrapper>
      </ThemeBox>

      <Wrapper>
        <Card>
          <TrendChart
            data={trends?.[chartType]}
            title={TrendTitle}
            type="14d"
            variant="detail"
          />
        </Card>
      </Wrapper>
    </Box>
  )
}

export default Detail

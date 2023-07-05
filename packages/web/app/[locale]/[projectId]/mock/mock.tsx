'use client'

import Ohbug from '@ohbug/browser'
import type { OhbugClient, OhbugConfig } from '@ohbug/types'
import { Wrap } from '@chakra-ui/react'
import { useLocalStorage, useMount } from 'react-use'
import type { Project } from '@prisma/client'
import { useMemo } from 'react'
import Config from './Config'
import Ajax from './Ajax'
import Error from './Error'
import HashChange from './HashChange'
import History from './History'
import InsertRes from './InsertRes'
import CustomReport from './CustomReport'
import PromiseError from './PromiseError'
import Wrapper from '~/components/wrapper'
import ThemeBox from '~/components/themeBox'

interface Props {
  project: Project
}

// eslint-disable-next-line import/no-mutable-exports
export let client: OhbugClient

export default function Mock({ project }: Props) {
  const defaultConfig = useMemo<OhbugConfig>(() => ({
    apiKey: project.apiKey,
    appVersion: '0.0.1',
    appType: 'react',
    endpoint: 'http://localhost:6660',
    releaseStage: 'mock',
    maxActions: 10,
  }), [project])
  const [value] = useLocalStorage('MOCK_CONFIG', defaultConfig)
  const config = useMemo<OhbugConfig>(() => ({
    ...defaultConfig,
    ...value,
  }), [defaultConfig, value])
  useMount(() => {
    client = Ohbug.setup(config)
  })

  return (
    <ThemeBox bg="current">
      <Wrapper>
        <Config defaultConfig={config} />
        <Wrap mt={4}>
          <Error />
          <Ajax />
          <HashChange />
          <History />
          <InsertRes />
          <CustomReport />
          <PromiseError />
        </Wrap>
      </Wrapper>
    </ThemeBox>
  )
}

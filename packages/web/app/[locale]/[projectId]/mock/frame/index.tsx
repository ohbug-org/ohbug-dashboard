import { useMemo, useRef } from 'react'
import Ohbug from '@ohbug/browser'
import OhbugExtensionFeedback from '@ohbug/extension-feedback'
import type { OhbugClient, OhbugConfig } from '@ohbug/types'
import { useLocalStorage, useMount } from 'react-use'
import type { Project } from '@prisma/client'
import Config from './Config'
import Ajax from './Ajax'
import Error from './Error'
import HashChange from './HashChange'
import History from './History'
import InsertRes from './InsertRes'
import CustomReport from './CustomReport'
import PromiseError from './PromiseError'

interface Props {
  project: Project
}

// eslint-disable-next-line import/no-mutable-exports
export let client: OhbugClient

export default function Frame({ project }: Props) {
  const defaultConfig = useMemo<OhbugConfig>(() => {
    const location = typeof window !== 'undefined' ? window.location : {} as any
    return {
      apiKey: project.apiKey,
      appVersion: '0.0.1',
      appType: 'react',
      endpoint: `${location.protocol}//${location.host.split(':')[0]}:6660`,
      releaseStage: 'mock',
      maxActions: 10,
    }
  }, [project])
  const [value] = useLocalStorage('MOCK_CONFIG', defaultConfig)
  const config = useMemo<OhbugConfig>(() => ({
    ...defaultConfig,
    ...value,
  }), [defaultConfig, value])
  const feedbackRef = useRef<HTMLDivElement>(null)
  useMount(() => {
    client = Ohbug.setup(config)
    client.use(OhbugExtensionFeedback(feedbackRef.current!))
    return () => {
      client.destroy()
    }
  })

  return (
    <div>
      <Config defaultConfig={config} />
      <div className='mt-4 flex flex-wrap'>
        <div ref={feedbackRef} />
        <Error />
        <Ajax />
        <HashChange />
        <History />
        <InsertRes />
        <CustomReport />
        <PromiseError />
      </div>
    </div>
  )
}

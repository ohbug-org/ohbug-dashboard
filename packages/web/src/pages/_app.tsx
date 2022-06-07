import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Layout from '../components/layout'
import '~/styles/globals.css'

dayjs.extend(relativeTime)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{ fetcher: (resource, init) => fetch(resource, init).then(res => res.json()) }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}

export default MyApp

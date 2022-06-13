import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Layout from '../components/layout'
import '~/styles/globals.css'

dayjs.extend(relativeTime)

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>)

  return getLayout((
    <SessionProvider session={session}>
      <SWRConfig
        value={{ fetcher: (resource, init) => fetch(resource, init).then(res => res.json()) }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  ))
}

export default MyApp

import type { AppProps } from 'next/app'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Layout from '../components/layout'
import '~/styles/globals.css'

dayjs.extend(relativeTime)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp

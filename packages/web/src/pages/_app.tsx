import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Layout from '../components/layout'
import '~/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp

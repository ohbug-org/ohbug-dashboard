import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider, useSession } from 'next-auth/react'
import useSWR, { SWRConfig } from 'swr'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { NextIntlProvider } from 'next-intl'
import { useRouter } from 'next/router'
import defaultMessages from '../locales/en.json'
import Layout from '~/components/layout'
import theme from '~/styles/theme'
dayjs.extend(relativeTime)

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function Controller({ children }: { children: ReactElement }) {
  const router = useRouter()
  const session = useSession()
  const { data: projects } = useSWR(session.status === 'authenticated' ? '/api/projects' : null)

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.replace('/api/auth/signin')
    }
  }, [session])
  useEffect(() => {
    if (projects && !projects.length) {
      router.replace('/create-project')
    }
  }, [projects])

  return children
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter()
  const [messages, setMessages] = useState(defaultMessages)
  useEffect(() => {
    if (router.locale) {
      import(`../locales/${router.locale}.json`).then(({ default: messages }) => {
        setMessages(messages)
      })
      import(`dayjs/locale/${router.locale}.js`).then(() => {
        dayjs.locale(router.locale)
      })
    }
  }, [router.locale])

  return (
    <NextIntlProvider
      locale={router.locale}
      messages={pageProps.messages || messages}
    >
      <SessionProvider session={pageProps.session}>
        <Controller>
          <SWRConfig
            value={{ fetcher: (resource, init) => fetch(resource, init).then(res => res.json()) }}
          >
            <ChakraProvider
              resetCSS
              theme={theme}
            >
              {
                Component.getLayout
                  ? Component.getLayout(<Component {...pageProps} />)
                  : <Layout><Component {...pageProps} /></Layout>
              }
            </ChakraProvider>
          </SWRConfig>
        </Controller>
      </SessionProvider>
    </NextIntlProvider>
  )
}

export default MyApp

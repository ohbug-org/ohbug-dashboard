import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider, useSession } from 'next-auth/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { NextIntlProvider } from 'next-intl'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { withNextRuntime } from 'next-runtime/app'
import type { User } from '@prisma/client'
import defaultMessages from '../locales/en.json'
import Layout from '~/components/layout'
import theme from '~/styles/theme'
import { serviceGetProjects } from '~/services/projects'
import { useQuery } from '~/hooks/useQuery'
import '~/styles/nprogress.css'

const TopProgressBar = dynamic(
  () => {
    return import('~/components/topProgressBar')
  },
  { ssr: false },
)
dayjs.extend(relativeTime)

export type NextPageWithLayout<T = any> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function Controller({ children }: { children: ReactElement }) {
  const router = useRouter()
  const session = useSession()
  const { data: projects } = useQuery(
    () => serviceGetProjects(session.data?.user as User),
    { enabled: session.status === 'authenticated' },
  )

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      if (router.pathname !== '/auth/signin') {
        router.replace('/auth/signin')
      }
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
          <ChakraProvider
            resetCSS
            theme={theme}
          >
            <TopProgressBar />
            {
              Component.getLayout
                ? Component.getLayout(<Component {...pageProps} />)
                : <Layout><Component {...pageProps} /></Layout>
            }
          </ChakraProvider>
        </Controller>
      </SessionProvider>
    </NextIntlProvider>
  )
}

export default withNextRuntime(MyApp)

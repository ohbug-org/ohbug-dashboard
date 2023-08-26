'use client'

import { useEffect } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { SessionProvider, useSession } from 'next-auth/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { usePathname, useRouter } from 'next-intl/client'
import dynamic from 'next/dynamic'
import { CacheProvider } from '@chakra-ui/next-js'
import { type ReactElement, type ReactNode } from 'react'
import { type Session } from 'next-auth'
import { type User } from '@prisma/client'
import Layout from '~/components/layout'
import theme from '~/styles/theme'
import { serviceGetProjects } from '~/services/projects'
import { useQuery } from '~/hooks/use-query'
import '~/styles/nprogress.css'
import { Toaster } from '~/components/ui/toaster'

const TopProgressBar = dynamic(
  () => {
    return import('~/components/top-progress-bar')
  },
  { ssr: false },
)
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

function Controller({ children }: { children: ReactElement }) {
  const router = useRouter()
  const pathname = usePathname()
  const session = useSession()
  const { data: projects } = useQuery(
    () => serviceGetProjects(session.data?.user as User),
    { enabled: session.status === 'authenticated' },
  )

  useEffect(() => {
    if (session.status === 'unauthenticated' && pathname !== '/auth/signin') {
      router.replace('/auth/signin')
    }
  }, [pathname, session])
  useEffect(() => {
    if (session.status === 'authenticated' && projects && projects.length === 0) {
      router.replace('/create-project')
    }
  }, [session, projects])

  return children
}

interface Props {
  children: ReactNode
  session: Session | null
}

export function Providers({ children, session }: Props) {
  return (
    <SessionProvider session={session}>
      <Controller>
        <CacheProvider>
          <NextUIProvider>
            <ChakraProvider theme={theme}>
              <Toaster />
              <ColorModeScript />
              <TopProgressBar />
              <Layout>
                {children}
              </Layout>
            </ChakraProvider>
          </NextUIProvider>
        </CacheProvider>
      </Controller>
    </SessionProvider>
  )
}

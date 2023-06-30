'use client'

import type { ReactElement, ReactNode } from 'react'
import { useEffect } from 'react'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { SessionProvider, useSession } from 'next-auth/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { usePathname, useRouter } from 'next-intl/client'
import dynamic from 'next/dynamic'
import type { User } from '@prisma/client'
import { CacheProvider } from '@chakra-ui/next-js'
import type { Session } from 'next-auth'
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
    if (session.status === 'unauthenticated') {
      if (pathname !== '/auth/signin') {
        router.replace('/auth/signin')
      }
    }
  }, [pathname, session])
  useEffect(() => {
    if (projects && !projects.length) {
      router.replace('/create-project')
    }
  }, [projects])

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
          <ChakraProvider theme={theme}>
            <ColorModeScript />
            <TopProgressBar />
            <Layout>
              {children}
            </Layout>
          </ChakraProvider>
        </CacheProvider>
      </Controller>
    </SessionProvider>
  )
}

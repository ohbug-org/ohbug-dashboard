'use client'

import { useEffect } from 'react'
import { SessionProvider, useSession } from 'next-auth/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { usePathname, useRouter } from 'next-intl/client'
import dynamic from 'next/dynamic'
import { type ReactElement, type ReactNode } from 'react'
import { type Session } from 'next-auth'
import { type User } from '@prisma/client'
import { serviceGetProjects } from '~/services/projects'
import { useQuery } from '~/hooks/use-query'
import '~/styles/nprogress.css'
import { Toaster } from '~/components/ui/toaster'
import { ThemeProvider } from '~/components/ui/theme-provider'
import { TooltipProvider } from '~/components/ui/tooltip'

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
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
        >
          <TooltipProvider>
            <Toaster />
            <TopProgressBar />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </Controller>
    </SessionProvider>
  )
}

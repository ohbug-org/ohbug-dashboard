import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { type ReactNode } from 'react'
import { Providers } from './providers'
import { getAuthOptions } from '~/auth'
import '~/styles/globals.css'
import { ThemeProvider } from '~/components/ui/theme-provider'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

export default async function Layout({ children, params: { locale } }: {
  children: ReactNode
  params: { locale: string }
}) {
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  }
  catch {
    notFound()
  }
  const session = await getServerSession(getAuthOptions())

  return (
    <html lang={locale}>
      <head>
        <title>Ohbug</title>
      </head>

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
          >
            <Providers session={session}>
              {children}
            </Providers>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

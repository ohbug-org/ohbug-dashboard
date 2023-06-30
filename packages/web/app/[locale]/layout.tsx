import type { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { Providers } from './providers'
import { getAuthOptions } from '~/auth'

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
  catch (error) {
    notFound()
  }
  const session = await getServerSession(getAuthOptions())

  return (
    <html lang={locale}>
      <head>
        <title>Ohbug</title>
      </head>

      <body>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <Providers session={session}>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

import { type NextRequest } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import createIntlMiddleware from 'next-intl/middleware'

const locales = ['en', 'zh']
export const defaultLocale = 'en'
const publicPages = [
  '/',
  '/auth/signin',
]

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
})

const authMiddleware = withAuth(
  req => intlMiddleware(req),
  {
    callbacks: { authorized: ({ token }) => token != null },
    pages: { signIn: '/auth/signin' },
  },
)

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
    'i',
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    return intlMiddleware(req)
  }
  else {
    return (authMiddleware as any)(req)
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}

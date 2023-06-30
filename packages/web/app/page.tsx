import { redirect } from 'next/navigation'
import { defaultLocale } from '~/middleware'

export default function RootPage() {
  return redirect(`/${defaultLocale}`)
}

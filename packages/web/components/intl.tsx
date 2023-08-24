'use client'

import type { ChangeEvent } from 'react'
import { useCallback, useTransition } from 'react'
import { usePathname } from 'next-intl/client'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
const options = [
  {
    label: '中文',
    value: 'zh',
  },
  {
    label: 'English',
    value: 'en',
  },
]

export default function Intl() {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const locale = useLocale()

  const handleChange = useCallback(async(e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const value = e.target.value
    startTransition(() => {
      router.replace(`/${value}${pathname}`)
    })
  }, [pathname])

  return (
    <select
      className="w-24"
      disabled={isPending}
      onChange={handleChange}
      value={locale}
    >
      {
        options.map(({ label, value }) => (
          <option
            key={value}
            value={value}
          >
            {label}
          </option>
        ))
      }
    </select>
  )
}

'use client'

import { useCallback, useTransition } from 'react'
import { usePathname } from 'next-intl/client'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

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

  const handleChange = useCallback(async (value: string) => {
    startTransition(() => {
      router.replace(`/${value}${pathname}`)
    })
  }, [pathname])

  return (
    <Select
      disabled={isPending}
      value={locale}
      onValueChange={handleChange}
    >
      <SelectTrigger className="w-24">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            options.map(({ label, value }) => (
              <SelectItem
                key={value}
                value={value}
              >
                {label}
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

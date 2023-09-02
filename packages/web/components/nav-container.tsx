'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { cn } from '~/libs/utils'

export interface Nav {
  label: string
  href: string
  active: boolean
}
interface Props {
  children: ReactNode
  navs: Nav[]
}

export default function NavContainer({ children, navs }:Props) {
  return (
    <div className='flex justify-between'>
      <div>
        {
          navs.map(nav => (
            <Link
              href={nav.href}
              key={nav.href}
            >
              <Button
                className={cn(nav.active ? 'font-bold' : 'font-normal')}
                variant="outline"
              >
                {nav.label}
              </Button>
            </Link>
          ))
        }
      </div>
      <div>{children}</div>
    </div>
  )
}

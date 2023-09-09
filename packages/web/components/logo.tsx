'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { type CSSProperties } from 'react'
import { cn } from '~/libs/utils'

interface Props {
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

const Logo = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const { resolvedTheme } = useTheme()

  return (
    <Link
      href="/"
      {...props}
      ref={ref}
      className={cn('inline-block cursor-pointer relative w-16 h-16', props.className)}
    >
      <Image
        fill
        priority
        alt="logo"
        src={resolvedTheme === 'dark' ? '/logo-white.svg' : '/logo.svg'}
      />
    </Link>
  )
})
Logo.displayName = 'Logo'
export default Logo

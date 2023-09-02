'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { useTheme } from 'next-themes'
import { type CSSProperties } from 'react'

interface Props {
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

const Logo = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const { theme } = useTheme()

  return (
    <Link
      href="/"
      {...props}
      ref={ref}
      className={twMerge('inline-block cursor-pointer relative w-16 h-16', props.className)}
    >
      <Image
        fill
        priority
        alt="logo"
        src={theme === 'dark' ? '/logo-white.svg' : '/logo.svg'}
      />
    </Link>
  )
})
Logo.displayName = 'Logo'
export default Logo

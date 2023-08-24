'use client'

import type { CSSProperties } from 'react'
import { forwardRef } from 'react'
import Link from 'next/link'
import { useColorMode } from '@chakra-ui/react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

const Logo = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const { colorMode } = useColorMode()
  return (
    <Link
      href="/"
      {...props}
      className={twMerge('inline-block cursor-pointer relative w-16 h-16', props.className)}
      ref={ref}
    >
      <Image
        alt="logo"
        fill
        priority
        src={colorMode === 'dark' ? '/logo-white.svg' : '/logo.svg'}
      />
    </Link>
  )
})
Logo.displayName = 'Logo'
export default Logo

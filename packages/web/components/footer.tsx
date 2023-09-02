'use client'

import Link from 'next/link'
import { type FC } from 'react'
import Logo from './logo'
import Intl from './intl'
import Theme from './theme'

const Footer: FC = () => {
  return (
    <footer className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Logo />
        <div className="text-sm text-stone-500">
          v{process.env.NEXT_PUBLIC_VERSION}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="https://github.com/ohbug-org"
          target="_blank"
        >
          <i className="i-ri-github-fill text-xl" />
        </Link>
        <Link
          href="https://discord.gg/FmxaBSBumM"
          target="_blank"
        >
          <i className="i-ri-discord-fill text-xl" />
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Intl />
        <Theme />
      </div>
    </footer>
  )
}

export default Footer

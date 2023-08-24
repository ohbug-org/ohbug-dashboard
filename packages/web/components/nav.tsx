'use client'

import Link from 'next/link'
import User from './user'
import Breadcrumbs from './breadcrumbs'

export default function Nav() {
  return (
    <div
      className="flex items-center justify-between w-full h-full"
    >
      <Breadcrumbs />

      <div className="flex items-center gap-4">
        <Link
          href="https://ohbug.net/"
          target="_blank"
        >
          Docs
        </Link>
        <User />
      </div>
    </div>
  )
}

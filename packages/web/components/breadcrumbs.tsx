'use client'

import Link from 'next/link'
import { Divider } from '@nextui-org/react'
import Project from './project'
import Logo from './logo'
import useBreadcrumb from '~/hooks/use-breadcrumb'

export default function Breadcrumbs() {
  const [breadcrumbs] = useBreadcrumb()

  return (
    <div className="flex gap-4">
      <Logo />

      <Divider orientation="vertical" />

      <Project />

      {breadcrumbs.length > 0 ? <Divider orientation="vertical" /> : null}

      <div className="flex items-center">
        {
          breadcrumbs
            .slice(0, - 1)
            .map(v => (
              <div key={v.path}>
                <Link href={v.path}>
                  {v.breadcrumb}
                </Link>
              </div>
            ))
        }

        <Divider orientation="vertical" />

        <div>{breadcrumbs.at(-1)?.breadcrumb}</div>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import Project from './project'
import Logo from './logo'
import useBreadcrumb from '~/hooks/use-breadcrumb'
import { Separator } from '~/components/ui/separator'

export default function Breadcrumbs() {
  const [breadcrumbs] = useBreadcrumb()

  return (
    <div className="flex items-center gap-2">
      <Logo />

      <Separator
        className="h-5 rotate-[26deg] mx-2"
        orientation="vertical"
      />

      <Project />

      {breadcrumbs.slice(0, -1).length > 0
        ? (
          <Separator
            className="h-5 rotate-[26deg] mx-2"
            orientation="vertical"
          />
          )
        : null}

      <div className="flex items-center">
        {
          breadcrumbs
            .slice(0, -1)
            .map(v => (
              <div key={v.path}>
                <Link href={v.path}>
                  {v.breadcrumb}
                </Link>
              </div>
            ))
        }

        <Separator
          className="h-5 rotate-[26deg] mx-2"
          orientation="vertical"
        />

        <div className="ml-1 text-stone-500">{breadcrumbs.at(-1)?.breadcrumb}</div>
      </div>
    </div>
  )
}

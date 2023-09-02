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

      <Separator orientation="vertical" className='h-5 rotate-[26deg] mx-2' />

      <Project />

      {breadcrumbs.slice(0, -1).length > 0 ? <Separator orientation="vertical" className='h-5 rotate-[26deg] mx-2' /> : null}

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

        <Separator orientation="vertical" className='h-5 rotate-[26deg] mx-2' />

        <div>{breadcrumbs.at(-1)?.breadcrumb}</div>
      </div>
    </div>
  )
}

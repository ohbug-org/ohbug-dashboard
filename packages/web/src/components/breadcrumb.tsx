import Link from 'next/link'
import type { FC } from 'react'
import useBreadcrumb from '~/hooks/useBreadcrumb'

const Breadcrumb: FC = () => {
  const [breadcrumbs] = useBreadcrumb()

  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {
          breadcrumbs
            .slice(0, breadcrumbs.length - 1)
            .map(v => (<li key={v.path}><Link href={v.path}><a>{v.breadcrumb}</a></Link></li>))
        }
        <li>{breadcrumbs.at(-1)?.breadcrumb}</li>
      </ul>
    </div>
  )
}

export default Breadcrumb

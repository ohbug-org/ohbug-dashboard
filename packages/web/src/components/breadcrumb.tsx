import Link from 'next/link'
import type { FC } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import useBreadcrumb from '~/hooks/useBreadcrumb'

const Breadcrumbs: FC = () => {
  const [breadcrumbs] = useBreadcrumb()

  return (
    <Breadcrumb>
      {
        breadcrumbs
          .slice(0, breadcrumbs.length - 1)
          .map(v => (
            <BreadcrumbItem key={v.path}>
              <Link href={v.path}>
                <BreadcrumbLink>
                  {v.breadcrumb}
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          ))
      }
      <BreadcrumbItem><BreadcrumbLink>{breadcrumbs.at(-1)?.breadcrumb}</BreadcrumbLink></BreadcrumbItem>
    </Breadcrumb>
  )
}

export default Breadcrumbs

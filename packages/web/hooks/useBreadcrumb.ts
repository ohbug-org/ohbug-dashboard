import { usePathname } from 'next-intl/client'
import { useEffect, useState } from 'react'
import useCurrentProject from './useCurrentProject'

interface Breadcrumb {
  breadcrumb: string
  path: string
}
export default function useBreadcrumb() {
  const pathname = usePathname()
  const { projectId } = useCurrentProject()
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])
  useEffect(() => {
    if (pathname) {
      const linkPath = pathname.split('/')
      linkPath.shift()
      linkPath.shift()

      const pathArray = linkPath
        .map((path, i) => {
          if (path) {
            return {
              breadcrumb: path,
              path: `/${projectId}/${linkPath.slice(0, i + 1).join('/')}`,
            }
          }
          return null
        })
        .filter(v => !!v) as Breadcrumb[]
      setBreadcrumbs(pathArray)
    }
  }, [pathname, projectId])

  return [breadcrumbs] as const
}

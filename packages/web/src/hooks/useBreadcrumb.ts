import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useCurrentProject from './useCurrentProject'

interface Breadcrumb {
  breadcrumb: string
  path: string
}
export default function useBreadcrumb() {
  const router = useRouter()
  const { projectId } = useCurrentProject()
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])
  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/')
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
  }, [router, projectId])

  return [breadcrumbs] as const
}

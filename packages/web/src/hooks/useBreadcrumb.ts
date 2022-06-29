import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface Breadcrumb {
  breadcrumb: string
  path: string
}
export default function useBreadcrumb() {
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])
  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/')
      linkPath.shift()

      const pathArray = linkPath
        .map((path, i) => {
          if (path) {
            if (i === 0) {
              return {
                breadcrumb: path,
                path: `/${path}/profile`,
              }
            }
            return {
              breadcrumb: path,
              path: `/${linkPath.slice(0, i + 1).join('/')}`,
            }
          }
          return null
        })
        .filter(v => !!v) as Breadcrumb[]
      setBreadcrumbs(pathArray)
    }
  }, [router])

  return [breadcrumbs] as const
}

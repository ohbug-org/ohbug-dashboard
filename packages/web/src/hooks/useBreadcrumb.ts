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

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          path: `/${linkPath.slice(0, i + 1).join('/')}`,
        }
      })
      setBreadcrumbs(pathArray)
    }
  }, [router])

  return [breadcrumbs] as const
}

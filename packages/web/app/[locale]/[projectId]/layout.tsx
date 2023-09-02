import { type ReactNode } from 'react'
import Layout from '~/components/layout'

interface Props {
  children: ReactNode
}

export default function ProjectLayout({ children }: Props) {
  return <Layout>{children}</Layout>
}

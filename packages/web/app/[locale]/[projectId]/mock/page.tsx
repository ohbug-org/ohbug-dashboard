import { type Metadata } from 'next'
import Mock from './mock'
import { serviceGetProject } from '~/services/projects'

export const metadata: Metadata = { title: 'Mock | Ohbug' }

export default async function MockPage({ params }: { params: { projectId: string } }) {
  const project = await serviceGetProject(Number.parseInt(params.projectId))
  return (
    <Mock project={project} />
  )
}

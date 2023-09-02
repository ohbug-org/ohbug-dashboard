import { type Metadata } from 'next'
import CreateProject from './create-project'

export const metadata: Metadata = { title: 'Create Project | Ohbug' }

export default async function CreateProjectPage() {
  return (
    <CreateProject />
  )
}

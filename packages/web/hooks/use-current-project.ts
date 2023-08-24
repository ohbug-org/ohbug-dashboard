import { useParams } from 'next/navigation'
import { useStore } from '~/store'

export default function useCurrentProject() {
  const params = useParams()
  const projectId = params.projectId
  const project = useStore(state => state.project)

  return { projectId: projectId ? Number.parseInt(projectId as string) : project?.id }
}

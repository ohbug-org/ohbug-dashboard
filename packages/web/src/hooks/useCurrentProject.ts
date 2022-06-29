import { useRouter } from 'next/router'
import { useStore } from '~/store'

export default function useCurrentProject() {
  const router = useRouter()
  const { projectId } = router.query
  const project = useStore(state => state.project)

  return { projectId: projectId ? parseInt(projectId as string) : project?.id }
}

import SourceMaps from './sourceMaps'
import { serviceGetRelease } from '~/services/releases'

export default async function SourceMapsPage({ params }: { params: { releaseId: string } }) {
  const releaseId = params.releaseId
  const release = await serviceGetRelease({ id: parseInt(releaseId) })

  return (
    <SourceMaps release={release} />
  )
}

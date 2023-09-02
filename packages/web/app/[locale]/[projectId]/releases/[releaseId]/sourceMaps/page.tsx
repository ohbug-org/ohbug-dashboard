import SourceMaps from './source-maps'
import { serviceGetRelease } from '~/services/releases'

export default async function SourceMapsPage({ params }: { params: { releaseId: string } }) {
  const releaseId = params.releaseId
  const release = await serviceGetRelease({ id: Number.parseInt(releaseId) })

  return (
    <SourceMaps release={release} />
  )
}

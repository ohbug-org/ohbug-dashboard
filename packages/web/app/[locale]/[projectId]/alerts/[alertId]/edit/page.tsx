import type { OmitAlert } from 'common'
import Edit from './edit'
import { serviceGetAlert } from '~/services/alerts'

export default async function EditPage({ params }: { params: { alertId: string } }) {
  const alertId = parseInt(params.alertId)
  const alert = (await serviceGetAlert({ id: alertId })) as unknown as OmitAlert

  return (
    <Edit alert={alert} />
  )
}

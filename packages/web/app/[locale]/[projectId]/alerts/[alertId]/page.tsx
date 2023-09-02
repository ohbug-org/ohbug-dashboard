import AlertId from './alert-id'
import { serviceGetAlert, serviceGetAlertEventTrends, serviceGetAlertEvents } from '~/services/alerts'

export default async function AlertIdPage({ params }: { params: { alertId: string } }) {
  const alertId = Number.parseInt(params.alertId, 10)
  const alert = await serviceGetAlert({ id: alertId })
  const alertEvents = await serviceGetAlertEvents(alertId)
  const alertEventTrends = await serviceGetAlertEventTrends({ id: alertId, type: '14d' })

  return (
    <AlertId
      alert={alert}
      alertEventTrends={alertEventTrends}
      alertEvents={alertEvents}
    />
  )
}

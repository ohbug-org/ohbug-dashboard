import dayjs from 'dayjs'
import Profile from './profile'
import { serviceGetProject, serviceGetProjectTrends } from '~/services/projects'
import { serviceGetPVPathGroupResult, serviceGetPVReferrerGroupResult, serviceGetPageView, serviceGetUserView } from '~/services/views'

export default async function ProfilePage({ params }: { params: { projectId: string } }) {
  const projectId = parseInt(params.projectId)
  const project = await serviceGetProject(projectId)
  const trends14d = await serviceGetProjectTrends({ id: projectId, type: '14d' })
  const trends24h = await serviceGetProjectTrends({ id: projectId, type: '24h' })
  const pageView = await serviceGetPageView({ apiKey: project.apiKey })
  const pageViewLastDay = await serviceGetPageView({ apiKey: project.apiKey, expirationDate: dayjs().startOf('date').toDate() })
  const userView = await serviceGetUserView({ apiKey: project.apiKey })
  const userViewLastDay = await serviceGetUserView({ apiKey: project.apiKey, expirationDate: dayjs().startOf('date').toDate() })
  const activeUser = await serviceGetUserView({ apiKey: project.apiKey, startDate: dayjs().subtract(5, 'minute').toDate() })
  const pvPathGroupResult = await serviceGetPVPathGroupResult({ apiKey: project.apiKey })
  const pvReferrerGroupResult = await serviceGetPVReferrerGroupResult({ apiKey: project.apiKey })

  return (
    <Profile
      project={project}
      trends={
        {
          '14d': trends14d,
          '24h': trends24h,

        }
      }
      views={
        {
          pageView,
          pageViewLastDay,
          userView,
          userViewLastDay,
          activeUser,
          pvPathGroupResult,
          pvReferrerGroupResult,
        }
      }
    />
  )
}

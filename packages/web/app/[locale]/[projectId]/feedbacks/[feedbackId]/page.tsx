import FeedbackId from './feedback-id'
import { serviceGetFeedback } from '~/services/feedbacks'

export default async function FeedbackIdPage({ params }: { params: { feedbackId: string } }) {
  const feedbackId = params.feedbackId
  const feedback = await serviceGetFeedback({ id: feedbackId })

  return (
    <FeedbackId feedback={feedback} />
  )
}

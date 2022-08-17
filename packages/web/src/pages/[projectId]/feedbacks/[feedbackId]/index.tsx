import type { GetServerSideProps, NextPage } from 'next'
import { Flex } from '@chakra-ui/react'
import type { Feedback } from '@prisma/client'
import EventDetailActions from '~/components/eventDetailAction'
import EventDetailProfile from '~/components/eventDetailProfile'
import EventDetailUser from '~/components/eventDetailUser'
import { serviceGetFeedback } from '~/services/feedbacks'

interface Props {
  feedback: Feedback
}

export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
  const feedbackId = context.query.feedbackId as string
  const feedback = await serviceGetFeedback({ id: feedbackId })
  return { props: { feedback } }
}

const Detail: NextPage<Props> = ({ feedback }) => {
  return (
    <Flex
      flexDirection="column"
      gap="6"
    >
      <EventDetailProfile event={feedback} />

      <EventDetailActions event={feedback} />

      <EventDetailUser event={feedback} />
    </Flex>
  )
}

export default Detail

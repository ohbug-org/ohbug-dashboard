'use client'

import { Flex, HStack, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { Snippet } from '@nextui-org/react'
import EventDetailActions from '~/components/event-detail-action'
import EventDetailProfile from '~/components/event-detail-profile'
import EventDetailUser from '~/components/event-detail-user'
import CardSection from '~/components/card-section'
import { Box } from '~/components/ui/box'
import Wrapper from '~/components/wrapper'

interface Props {
  feedback: any
}

export default function FeedbackId({ feedback }: Props) {
  const detail = useMemo(() => feedback.detail as any ?? {}, [feedback])

  return (
    <Flex
      flexDirection="column"
      gap="6"
    >
      <EventDetailProfile event={feedback} />

      <Box>
        <Wrapper>
          <CardSection
            title="Event Detail"
          >
            <VStack>
              {detail.feedback && <HStack w="full"><Box w="24">Feedback:</Box><Snippet>{detail.feedback}</Snippet></HStack>}
              {detail.selector && <HStack w="full"><Box w="24">Selector:</Box><Snippet>{detail.selector}</Snippet></HStack>}
              {detail.outerHTML && <HStack w="full"><Box w="24">outerHTML:</Box><Snippet>{detail.outerHTML}</Snippet></HStack>}
            </VStack>
          </CardSection>
        </Wrapper>
      </Box>

      <EventDetailActions event={feedback} />

      <EventDetailUser event={feedback} />
    </Flex>
  )
}

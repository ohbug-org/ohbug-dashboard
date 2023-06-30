'use client'

import { Box, Flex, HStack, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import EventDetailActions from '~/components/eventDetailAction'
import EventDetailProfile from '~/components/eventDetailProfile'
import EventDetailUser from '~/components/eventDetailUser'
import CardSection from '~/components/cardSection'
import ThemeBox from '~/components/themeBox'
import Wrapper from '~/components/wrapper'
import Copy from '~/components/copy'

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

      <ThemeBox bg="gray">
        <Wrapper>
          <CardSection
            title="Event Detail"
          >
            <VStack>
              {detail.feedback && <HStack w="full"><Box w="24">Feedback:</Box><Copy>{detail.feedback}</Copy></HStack>}
              {detail.selector && <HStack w="full"><Box w="24">Selector:</Box><Copy>{detail.selector}</Copy></HStack>}
              {detail.outerHTML && <HStack w="full"><Box w="24">outerHTML:</Box><Copy>{detail.outerHTML}</Copy></HStack>}
            </VStack>
          </CardSection>
        </Wrapper>
      </ThemeBox>

      <EventDetailActions event={feedback} />

      <EventDetailUser event={feedback} />
    </Flex>
  )
}

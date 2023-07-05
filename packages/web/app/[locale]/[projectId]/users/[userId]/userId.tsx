'use client'

import { Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import type { Event, EventUser, Feedback } from '@prisma/client'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import EventsList from '~/components/eventsList'
import ThemeBox from '~/components/themeBox'
import Wrapper from '~/components/wrapper'
import CardSection from '~/components/cardSection'
import useCurrentProject from '~/hooks/useCurrentProject'
import Title from '~/components/title'

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

interface Props {
  user: EventUser & {
    events: Event[]
    feedbacks: Feedback[]
  }
}

export default function UserId({ user }: Props) {
  const { projectId } = useCurrentProject()

  return (
    <Flex
      flexDirection="column"
      gap="6"
    >
      <ThemeBox bg="gray">
        <Title>

          <DynamicReactJson
            src={
              {
                ipAddress: user.ipAddress,
                uuid: user.uuid,
                email: user.email,
                name: user.name,
                metadata: user.metadata,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              }
            }
          />
        </Title>

        <Wrapper>
          <CardSection title="Related Events">
            <EventsList events={user.events} />
          </CardSection>
        </Wrapper>
        <Wrapper>
          <CardSection title="Related Feedbacks">
            <TableContainer>
              <Table className="w-full table table-compact">
                <Thead>
                  <Tr>
                    <Th>feedback</Th>
                    <Th>createdAt</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    user.feedbacks?.map((feedback) => {
                      const detail = feedback.detail as any
                      return (
                        <Tr key={feedback.id}>
                          <Td>
                            <Link href={`/${projectId}/feedbacks/${feedback.id}`}>
                              {detail.feedback}
                            </Link>
                          </Td>
                          <Td>
                            {dayjs(feedback.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                          </Td>
                        </Tr>
                      )
                    })
                  }
                </Tbody>
              </Table>
            </TableContainer>
          </CardSection>
        </Wrapper>
      </ThemeBox>
    </Flex>
  )
}
